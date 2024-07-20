import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Reset the form whenever the post prop changes
        reset({
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        });
    }, [post, reset]);

    const submit = async (data) => {
        if (!userData) {
            toast.error("User data is not available.");
            return;
        }

        const file = data.image[0];

        if (file) {
            if (!["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                toast.error("File type must be JPG, GIF, PNG.");
                return;
            }
        }

        try {
            if (post) {
                if (file) {
                    const uploadedFile = await appwriteService.uploadFile(file);
                    if (uploadedFile) {
                        appwriteService.deleteFile(post.featuredImage);
                        data.featuredImage = uploadedFile.$id;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, data);

                if (dbPost) {
                    toast.success("Post updated successfully.");
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const uploadedFile = file ? await appwriteService.uploadFile(file) : null;

                if (uploadedFile) {
                    data.featuredImage = uploadedFile.$id;
                }

                const dbPost = await appwriteService.createPost({ ...data, userId: userData?.$id });

                if (dbPost) {
                    toast.success("Post created successfully.");
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            toast.error("An error occurred while saving the post.");
            console.error(error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
    

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap" key={post?.$id || 'new'}>
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}
