use objc2::{rc::Retained, runtime::ProtocolObject};
use objc2_app_kit::{NSPasteboard, NSPasteboardWriting};
use objc2_foundation::{NSArray, NSString, NSURL};

pub unsafe fn copy_file_to_clipboard(paths: Vec<&str>) {
    let pb = NSPasteboard::generalPasteboard();
    pb.clearContents();

    let ns_str_vec: Vec<Retained<ProtocolObject<dyn NSPasteboardWriting>>> = paths
        .iter()
        .map(|path| {
            let ns_path_str = NSString::from_str(path);
            let url = NSURL::fileURLWithPath(&ns_path_str);
            ProtocolObject::<dyn NSPasteboardWriting>::from_retained(url)
        })
        .collect();

    // Converted to NSArray<&ProtocolObject<dyn NSPasteboardWriting>>
    let list: Vec<&ProtocolObject<dyn NSPasteboardWriting>> =
        ns_str_vec.iter().map(|r| &**r).collect();
    let ns_array = NSArray::from_slice(&list);

    // Write to pasteboard
    pb.writeObjects(&ns_array);
}
