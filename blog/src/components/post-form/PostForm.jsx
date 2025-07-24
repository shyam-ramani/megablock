import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug = slugTransform(value.title);
        setValue("slug", newSlug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    if (!userData) {
      alert("You must be logged in to submit a post.");
      return;
    }

    try {
      let imageId = post?.featuredImage;

      if (data.image && data.image[0]) {
        const uploadedFile = await appwriteService.uploadFile(data.image[0]);
        if (uploadedFile?.$id) {
          imageId = uploadedFile.$id;
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
        }
      }

      const postPayload = {
        title: data.title,
        slug: slugTransform(data.title),
        content: data.content,
        status: data.status,
        featuredimage: imageId, // ✅ must match Appwrite schema
        userid: userData.$id,
      };

      let responsePost;

      if (post) {
        responsePost = await appwriteService.updatePost(post.$id, postPayload);
      } else {
        responsePost = await appwriteService.createPost(postPayload);
      }

      if (responsePost) {
        navigate(`/post/${responsePost.$id}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting post:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Enter post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Auto-generated slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="mb-4"
          {...register("image", { required: !post })}
        />
        {post?.featuredImage && (
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
        <Button
          type="submit"
          className="w-full"
          bgColor={post ? "bg-green-600" : "bg-blue-600"}
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
