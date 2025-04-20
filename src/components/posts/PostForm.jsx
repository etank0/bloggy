import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RealtimeEditor, Select } from "..";
import storageService from "../../services/storage";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Dropzone from "./Dropzone";

export default function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      setLoading(true);
      const imageFile = Array.isArray(data?.image)
        ? data?.image[0]
        : data?.image || null;
      if (post) {
        const file = imageFile
          ? await storageService.uploadFile(imageFile)
          : null;

        const dbPost = await storageService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
          userName: userData?.name,
        });

        if (file) {
          storageService.deleteFile(post.featuredImage);
        }

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = imageFile && (await storageService.uploadFile(imageFile));

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await storageService.createPost({
            ...data,
            userID: userData?.$id,
            userName: userData?.name,
            userEmail: userData?.email,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        } else {
          toast.error("Please provide an image to upload post!");
        }
      }
    } catch (err) {
      if (err.code === 409) {
        toast.error("An article with the same slug already exists!");
      }
    }
    setLoading(false);
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

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {loading ? (
        <div className="flex flex-1 w-full min-h-[calc(100vh-5.5rem)]">
          <Spinner />
        </div>
      ) : (
        <div className="flex z-10 justify-center items-center bg-bkg-primary md:bg-bkg-primary/60 md:backdrop-blur-md flex-col flex-1 py-8 px-2 md:px-12">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col flex-1 w-full items-center md:items-start md:justify-center flex-wrap md:flex-row"
          >
            <div className="flex flex-1 flex-col w-[95%] md:h-full md:w-3/4 px-2">
              <div className="mb-2">
                <Input
                  label="Title: "
                  placeholder="Title"
                  className="mb-2 max-w-[50rem]"
                  {...register("title", {
                    required: "Title is required!",
                    minLength: {
                      value: 10,
                      message: "Title must be at least 10 characters long!",
                    },
                    maxLength: {
                      value: 255,
                      message: "Title must be at most 255 characters long!",
                    },
                  })}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs pl-2">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <Input
                  label="Slug: "
                  placeholder="Slug"
                  disabled={post ? true : false}
                  className={`mb-4 max-w-[50rem] ${post && "text-gray-500"}`}
                  {...register("slug", {
                    required: "Slug is required!",
                    minLength: {
                      value: 10,
                      message: "Slug must be at least 10 characters long!",
                    },
                    maxLength: {
                      value: 36,
                      message: "Slug must be at most 36 characters long!",
                    },
                  })}
                  onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
                {errors.slug && (
                  <p className="text-red-400 text-xs pl-2">
                    {errors.slug.message}
                  </p>
                )}
              </div>
              <RealtimeEditor
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
            <div className="w-[95%] md:w-1/4 px-2">
              <div className="mb-2">
                <Select
                  options={["active", "inactive"]}
                  label="Status: "
                  className="mt-6 mb-2 md:mt-0"
                  {...register("status", { required: "Status is required!" })}
                />
                {errors.status && (
                  <p className="text-red-400 text-xs pl-2">
                    {errors.status.message}
                  </p>
                )}
              </div>
              {/* <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register('image', { required: !post })}
              /> */}
              <div className="mb-2">
                <Dropzone
                  className="flex flex-col items-center justify-center mb-2 px-10 py-14 text-sm w-full border border-dashed border-2 rounded-lg h-[40%]"
                  setValue={setValue}
                  name="image"
                  {...register("image", {
                    required: !post
                      ? "Image is required for new posts!"
                      : false,
                  })}
                />
                {errors.image && (
                  <p className="text-red-400 text-xs pl-2">
                    {errors.image.message}
                  </p>
                )}
              </div>
              {post && (
                <div className="flex items-center justify-center h-[12rem] mb-4 rounded-lg">
                  <img
                    src={storageService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="h-full rounded-lg"
                  />
                </div>
              )}
              <Button
                type="submit"
                bgColor={post ? "bg-green-300" : undefined}
                className="w-full mt-4"
              >
                {post ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
