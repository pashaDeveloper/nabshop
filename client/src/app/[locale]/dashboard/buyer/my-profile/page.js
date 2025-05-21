"use client";

import Inform from "@/components/icons/Inform";
import Trash from "@/components/icons/Trash";
import Modal from "@/components/shared/Modal";
import Dashboard from "@/components/shared/layouts/Dashboard";
import {
  useDeleteUserMutation,
  useUpdateUserMutation
} from "@/services/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateUserInformation, { isLoading, data, error }] =
    useUpdateUserMutation();

  useEffect(() => {
    setUser(userInfo);

    if (isLoading) {
      toast.loading("Updating user...", { id: "updateUserInformation" });
    }

    if (data) {
      toast.success(data?.description, { id: "updateUserInformation" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "updateUserInformation" });
    }
  }, [userInfo, isLoading, data, error]);

  const handleAvatarPreview = (e) => {
    setAvatar(e.target.files[0]);

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleEditProfile(event) {
    event.preventDefault();

    const updatedUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
      role: event.target.role.value
    };

    // Add 'status' property for seller
    if (updatedUser.role === "admin") {
      updatedUser.status = "inactive";
    }

    // If avatarPreview is available, add it to the formData
    const formData = new FormData();
    Object.entries(updatedUser).forEach(([key, value]) =>
      formData.append(key, value)
    );

    if (avatarPreview !== null) {
      formData.append("avatar", avatar);
    }

    updateUserInformation(formData);
  }

  return (
    <Dashboard>
      <section className="flex flex-col gap-y-4">
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleEditProfile}
        >
          {/* آواتار */}
          <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
            <Image
              src={avatarPreview || user?.avatar?.url}
              alt={user?.avatar?.public_id || "آواتار"}
              width={96}
              height={96}
              className="w-full h-24 object-cover rounded"
            />

            <label
              htmlFor="avatar"
              className="w-full flex flex-col gap-y-1 relative"
            >
              <span className="text-sm cursor-pointer">انتخاب آواتار</span>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer z-50"
                accept=".jpg, .jpeg, .png"
                multiple={false}
                onChange={handleAvatarPreview}
              />
            </label>
          </div>

          {/* نام و ایمیل */}
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            {/* نام */}
            <label htmlFor="name" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">نام</span>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </label>

            {/* ایمیل */}
            <label htmlFor="email" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">ایمیل</span>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </label>
          </div>

          {/* شماره تلفن، نقش و آدرس */}
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            {/* شماره تلفن */}
            <label htmlFor="phone" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">شماره تلفن</span>
              <input
                type="text"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </label>

            {/* آدرس */}
            <label htmlFor="address" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">آدرس</span>
              <input
                type="text"
                name="address"
                id="address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </label>

            {/* نقش */}
            <label htmlFor="role" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">نقش</span>
              <select
                name="role"
                id="role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="buyer">خریدار</option>
                <option value="seller">فروشنده</option>
              </select>
            </label>
          </div>

          {/* دکمه ثبت تغییرات */}
          <input
            type="submit"
            value="به‌روزرسانی پروفایل"
            className="py-2 border border-black rounded bg-black hover:bg-black/90 text-white transition-colors drop-shadow cursor-pointer text-sm"
          />
        </form>

        <DeleteUser />
      </section>
    </Dashboard>
  );
};

function DeleteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [deleteUser, { isLoading, data, error }] = useDeleteUserMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting User...", { id: "deleteUser" });
    }

    if (data) {
      toast.success(data?.description, { id: "deleteUser" });
    }

    if (error) {
      toast.error(error?.data?.description, { id: "deleteUser" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      <button
        type="button"
        className="py-2 border border-black rounded bg-red-900 hover:bg-red-900/90 text-white transition-colors drop-shadow cursor-pointer text-sm"
        onClick={() => setIsOpen(true)}
      >
        حذف حساب کاربری
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-4 lg:w-1/5"
        >
          <article className="flex flex-col gap-y-4">
            <p className="text-xs bg-yellow-500/50 text-black px-2 py-0.5 rounded-sm text-center">
              حساب کاربری شما برای همیشه حذف خواهد شد!
            </p>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl">آیا مطمئن هستید؟</h1>
              <p className="text-sm flex flex-col gap-y-2">
                با حذف حساب، موارد زیر را از دست خواهید داد:
                <p className="flex flex-col gap-y-1.5">
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> {user?.cart?.length} محصول در سبد خرید
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> {user?.favorites?.length} محصول در لیست
                    علاقه‌مندی‌ها
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> {user?.purchases?.length} سابقه خرید
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> {user?.products?.length} محصولات ثبت‌شده
                  </span>
                </p>
              </p>
            </div>
            <div className="flex flex-row gap-x-4">
              <button
                className="text-white bg-slate-500 px-3 py-1.5 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                خیر، انصراف
              </button>
              <button
                className="flex flex-row gap-x-2 items-center text-white bg-red-500 px-3 py-1.5 rounded text-sm"
                onClick={() => deleteUser(user?._id)}
              >
                <Trash /> بله، حذف شود
              </button>
            </div>
          </article>
        </Modal>
      )}
    </>
  );
}

export default Page;
