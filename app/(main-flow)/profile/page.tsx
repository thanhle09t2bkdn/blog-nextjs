"use client";

import { ChangePasswordModal } from "@/components/molecules/ChangePasswordModal";
import CommonBreadcrumbs from "@/components/organisms/breadcrumbs/CommonBreadcrumbs";
import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import { useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);


  return (
    <div className="homepage bg-blue">
      <Header />
      <CommonBreadcrumbs page="My Profile" />

      <div className="bg-white pt-5 pb-12 md:pt-16 md:pb-32">
        <div className="max-w-[90%] md:max-w-[1200px] px-0 md:px-5 xl:px-0 w-full mx-auto">
          <p className="font-bold uppercase mb-10">Profile</p>

          <ChangePasswordModal isOpen={open} onClose={() => setOpen(false)} />

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
