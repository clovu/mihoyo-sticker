mod clipboard;
mod command;
mod error;
mod window;

use core::fmt;
use core_graphics::event::{CGEvent, CGEventFlags};
use core_graphics::event_source::CGEventSource;
use serde::{self, de, Deserialize, Deserializer};
use std::fs;
use std::str::FromStr;
use tauri::{AppHandle, Listener, Manager};
use tauri_nspanel::ManagerExt;
use tauri_plugin_global_shortcut::{Code, Modifiers, Shortcut, ShortcutState};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

use crate::window::WebviewWindowExt;

pub const SPOTLIGHT_LABEL: &str = "main";

pub trait IntoSome: Sized {
    fn some(self) -> Option<Self> {
        Some(self)
    }
}
impl<T> IntoSome for T {}

pub trait IntoOk<E>: Sized {
    fn into_ok(self) -> core::result::Result<Self, E> {
        Ok(self)
    }
}
impl<T, E> IntoOk<E> for T {}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![
            command::show,
            command::hide,
            copy_image
        ])
        .plugin(tauri_nspanel::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_shortcut(Shortcut::new(Some(Modifiers::SUPER), Code::KeyK))
                .unwrap()
                .with_handler(|app, shortcut, event| {
                    if event.state == ShortcutState::Pressed
                        && shortcut.matches(Modifiers::SUPER, Code::KeyK)
                    {
                        let window = app.get_webview_window(SPOTLIGHT_LABEL).unwrap();

                        let panel = app.get_webview_panel(SPOTLIGHT_LABEL).unwrap();

                        if panel.is_visible() {
                            panel.order_out(None);
                        } else {
                            window.center_at_cursor_monitor().unwrap();

                            apply_vibrancy(
                                &window,
                                window_vibrancy::NSVisualEffectMaterial::Sidebar,
                                None,
                                12.0.some(),
                            )
                            .unwrap();

                            panel.show();
                        }
                    }
                })
                .build(),
        )
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            let handle = app.app_handle();

            let window = app.get_webview_window(SPOTLIGHT_LABEL).unwrap();
            apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, 12.0.some())
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            // let ns_window: id = window.ns_window().unwrap() as _;
            // unsafe {
            //     add_corner_radius(ns_window, 12.0);
            // };

            let panel: tauri_nspanel::objc_id::Id<
                tauri_nspanel::raw_nspanel::RawNSPanel,
                tauri_nspanel::objc_id::Shared,
            > = window.to_spotlight_panel()?;
            handle.listen(
                format!("{}_panel_did_resign_key", SPOTLIGHT_LABEL),
                move |_| {
                    // Hide the panel when it's no longer the key window
                    // This ensures the panel doesn't remain visible when it's not actively being used
                    panel.order_out(None);
                },
            );

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug)]
enum Mime {
    Gif,
    Png,
    Jpeg,
}

impl FromStr for Mime {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "image/png" => Ok(Mime::Png),
            "image/jpeg" => Ok(Mime::Jpeg),
            "image/gif" => Ok(Mime::Gif),
            _ => Ok(Mime::Png),
        }
    }
}

impl<'de> Deserialize<'de> for Mime {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let str = String::deserialize(deserializer)?;
        Mime::from_str(&str).map_err(|_| de::Error::custom(format!("invalid MIME type: {}", str)))
    }
}

impl fmt::Display for Mime {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let ext = match self {
            Mime::Gif => "gif",
            Mime::Png => "png",
            Mime::Jpeg => "jpeg",
        };
        write!(f, "{}", ext)
    }
}

fn generate_temporary_filename(mime: Mime) -> String {
    let now = chrono::Local::now();
    let ext = mime.to_string();
    let ext = ext.as_str();

    now.format(format!("%Y-%m-%d at %H.%M.%S%.3f.{ext}").as_str())
        .to_string()
}

#[tauri::command]
fn copy_image(data: Vec<u8>, mime: Mime, app: AppHandle) -> Result<(), String> {
    let filename = generate_temporary_filename(mime);
    let temp_dir = std::env::temp_dir().join(filename);

    fs::write(&temp_dir, &data).map_err(|e| format!("{e:?}"))?;

    unsafe {
        clipboard::copy_file_to_clipboard(vec![temp_dir
            .to_str()
            .ok_or_else(|| "Failed to convert temp_dir to string".to_string())?])
    }

    let spotlight_panel = app.get_webview_panel(SPOTLIGHT_LABEL).unwrap();

    if spotlight_panel.is_visible() {
        spotlight_panel.order_out(None);
    }

    send_cmd_v();
    Ok(())
}

fn send_cmd_v() {
    let source =
        CGEventSource::new(core_graphics::event_source::CGEventSourceStateID::HIDSystemState)
            .unwrap();

    let key_down = CGEvent::new_keyboard_event(source.clone(), 9, true).unwrap(); // V key code
    key_down.set_flags(CGEventFlags::CGEventFlagCommand);

    let key_up = CGEvent::new_keyboard_event(source.clone(), 9, false).unwrap();
    key_up.set_flags(CGEventFlags::CGEventFlagCommand);

    key_down.post(core_graphics::event::CGEventTapLocation::HID);
    key_up.post(core_graphics::event::CGEventTapLocation::HID);
}
