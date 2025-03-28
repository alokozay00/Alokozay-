async function unlockPDF() {
    const fileInput = document.getElementById("pdfFile");
    if (!fileInput.files.length) {
        alert("لطفاً یک فایل PDF آپلود کنید.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
        const uint8Array = new Uint8Array(event.target.result);

        try {
            const pdfDoc = await PDFLib.PDFDocument.load(uint8Array, { ignoreEncryption: true });
            const newPdf = await pdfDoc.save();

            const blob = new Blob([newPdf], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            
            const downloadLink = document.getElementById("downloadLink");
            downloadLink.href = url;
            downloadLink.style.display = "block";
        } catch (error) {
            alert("متأسفیم، امکان حذف رمز این فایل وجود ندارد.");
        }
    };

    reader.readAsArrayBuffer(file);
}
