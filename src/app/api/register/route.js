
import bcrypt from "bcrypt";
import User from "@/model/userSchema";
import connection from "@/utils/DB/connection";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req, res) => {
    try {
        await connection();
        const body = await req.formData();
        // console.log(body);
        const profile = await body.get("profile")
        const firstName = await body.get("firstName");
        const lastName = await body.get("lastName")
        const email = await body.get("email")
        const location = await body.get("location")
        const occupation = await body.get("occupation")
        const password = await body.get("password")
        // console.log(image)
        const byteLength = await profile.arrayBuffer();
        // console.log(byteLength)
        const BufferData = Buffer.from(byteLength)
        // console.log(BufferData)
        const imageName = `${new Date().getTime()}${path.extname(profile.name)}`
        const profilePath = `./public/uploads/${imageName}`
        // console.log(profilePath);
        await writeFile(profilePath, BufferData);
        // const { firstName, lastName, email, location, occupation, password, profile } = body;

        const isAlreadyExist = await User.findOne({ email })
        if (isAlreadyExist) {
            return NextResponse.json({ msg: "User Already Exists" }, { status: 400 });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                firstName,
                lastName,
                email,
                location,
                occupation,
                password: hashPassword,
                profile: imageName
            })
            newUser.save();
            return NextResponse.json({ msg: "User register successfully" }, { status: 200 });
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Post Unsuccessfully" }, { status: 500 })

    }
}


