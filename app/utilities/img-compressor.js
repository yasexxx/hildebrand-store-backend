const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPng = require('imagemin-pngquant');

exports.compressImageJpeg = async (buffer, quality = Number) => {
    try {
        const file = await imagemin.buffer( buffer,{
            plugins: [
                imageminMozjpeg({quality: quality }),
                imageminPng({quality: `${quality}`})
            ]
        });
        return file;
    } catch (error) {
        console.log(error);
        return;
    }
}