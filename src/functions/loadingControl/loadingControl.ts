export default function loadingControl(action: boolean) {
    if (action) document.getElementById("loadingCircle-id")!.style.display = "flex"
    else document.getElementById("loadingCircle-id")!.style.display = "none"
}