"use client";

import { useSettingStore } from "@/lib/state/setting.store";

export default function AdminView() {
  const { currentAY } = useSettingStore();

  return <>This is the admin view</>;
}
