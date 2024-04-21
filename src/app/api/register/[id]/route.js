
import User from "@/model/userSchema";
import connection from "@/utils/DB/connection";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const PATCH = async (req, { params }) => {
    try {
        await connection();
        const id = params.id;
        const body = await req.formData();
        const profile = await body.get("profile")
        const firstName = await body.get("firstName");
        const lastName = await body.get("lastName")
        const bio = await body.get("bio")
        const location = await body.get("location")
        const occupation = await body.get("occupation")
        const phoneNumber = await body.get("phoneNumber")
        const wtpNumber = await body.get("wtpNumber")
        const githubLinks = await body.get("githubLinks")
        const twitterLinks = await body.get("twitterLinks")
        const linkedinLinks = await body.get("linkedinLinks")
        const faceBookLinks = await body.get("faceBookLinks")
        const instaLinks = await body.get("instaLinks")
        const portfolioLinks = await body.get("portfolioLinks")
        const user = await User.findById({ _id: id })
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        } else {
            if (profile) {
                const byteLength = await profile.arrayBuffer();
                const BufferData = Buffer.from(byteLength)
                const imageName = `${new Date().getTime()}${path.extname(profile.name)}`
                const profilePath = `./public/uploads/${imageName}`
                await writeFile(profilePath, BufferData);

                const updateUser = {
                    $set: {
                        profile: imageName, firstName: firstName, lastName: lastName, location: location, occupation: occupation, bio: bio, phoneNumber: phoneNumber, wtpNumber: wtpNumber,
                        githubLinks: githubLinks, linkedinLinks: linkedinLinks, twitterLinks: twitterLinks, instaLinks: instaLinks, faceBookLinks: faceBookLinks, portfolioLinks: portfolioLinks
                    }
                }
                const updatedUser = await User.updateOne({ _id: id }, updateUser);
                return NextResponse.json({ user: updatedUser }, { status: 200 });

            } else {
                const updateUser = {
                    $set: {
                        firstName: firstName, lastName: lastName, location: location, occupation: occupation, bio: bio, phoneNumber: phoneNumber, wtpNumber: wtpNumber,
                        githubLinks: githubLinks, linkedinLinks: linkedinLinks, twitterLinks: twitterLinks, instaLinks: instaLinks, faceBookLinks: faceBookLinks, portfolioLinks: portfolioLinks
                    }
                }
                const updatedUser = await User.updateOne({ _id: id }, updateUser);
                return NextResponse.json({ user: updatedUser }, { status: 200 });
            }

            // if (firstName !== user.firstName) user.firstName = firstName;
            // if (lastName !== user.lastName) user.lastName = lastName;
            // if (bio !== user.bio) user.bio = bio;
            // if (location !== user.location) user.location = location;
            // if (occupation !== user.occupation) user.occupation = occupation;
            // if (phoneNumber !== user.phoneNumber) user.phoneNumber = phoneNumber;
            // if (wtpNumber !== user.wtpNumber) user.whatsappNumber = wtpNumber;
            // if (githubLinks !== user.githubLinks) user.githubLinks = githubLinks;
            // if (twitterLinks !== user.twitterLinks) user.twitterLinks = twitterLinks;
            // if (linkedinLinks !== user.linkedinLinks) user.linkedinLinks = linkedinLinks;
            // if (faceBookLinks !== user.faceBookLinks) user.faceBookLinks = faceBookLinks;
            // if (instaLinks !== user.instaLinks) user.instaLinks = instaLinks;
            // if (portfolioLinks !== user.portfolioLinks) user.portfolioLinks = portfolioLinks;
            // await user.save();
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal Server error" }, { status: 500 })
    }
}
