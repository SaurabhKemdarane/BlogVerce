import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

   


    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const fetchedPost = await appwriteService.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                        
                        if (userData && fetchedPost.userId === userData.$id) {
                            setIsAuthor(true);
                            console.log(userData.name ,fetchedPost.userId);
                        }
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Error fetching post:", error);
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [slug,]);
  

    const deletePost = async () => {
        if (post) {
            try {
                const status = await appwriteService.deletePost(post.$id);
                if (status) {
                    await appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            } catch (error) {
                console.error("Failed to delete post:", error);
            }
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                   
                    <h1 className="text-2xl font-bold text-white">{post.title}</h1>
                </div>
                <div className="browser-css text-white">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
