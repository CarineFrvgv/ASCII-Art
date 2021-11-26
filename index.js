window.onload = function(){

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 640;
    canvas.height = 426;
    
    const image1 = new Image();
    image1.src = 'saturn.jpg';

    const ASCII = '`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
    const pixel_matrix = [];
    
    image1.addEventListener('load', function(){
        context.drawImage(image1, 0, 0);
        const imgData = context.getImageData(0, 0, this.width , this.height )

        let Img_row_arr = [];

        for (let i=0; i<imgData.data.length; i+=4) {
            const R = imgData.data[i];
            const G = imgData.data[i+1];
            const B = imgData.data[i+2];
            
            if (Img_row_arr.length < this.width) {
                Img_row_arr.push(Math.floor(0.299*R + 0.587*G + 0.114*B));
            }
            else {
                pixel_matrix.push(Img_row_arr);
                Img_row_arr = [];
                Img_row_arr.push(Math.floor(0.299*R + 0.587*G + 0.114*B));
            }
        }
            
        for (let i=0; i<pixel_matrix.length; i++) {
            for (let j=0; j<pixel_matrix[i].length; j++) {
                let d = (255 / pixel_matrix[i][j]);
                let num = Math.round((ASCII.length - 1)/ d);
                pixel_matrix[i][j] = ASCII[num].repeat(2);
            }
        }

        const printMatrix = pixel_matrix.map((d) => d.join(" ")).join("\n")
        console.log(printMatrix);

    });
}
