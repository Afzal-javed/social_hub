import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.name}`)
    }
})

export const upload = multer({ storage: storage })