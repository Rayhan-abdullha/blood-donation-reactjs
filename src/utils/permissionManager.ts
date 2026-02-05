import OneSignal from "react-onesignal";

let isOneSignalInitialized = false;

export const requestLocationPermission = (): Promise<{
  latitude: number | null;
  longitude: number | null;
}> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ latitude: null, longitude: null });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        resolve({ latitude: null, longitude: null });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  });
};

export const requestOneSignalPermission = async (): Promise<string | null> => {
  try {
    if (!isOneSignalInitialized) {
      isOneSignalInitialized = true;

      await OneSignal.init({
        appId: "00187e74-3cf4-4ca4-ac6e-7a8fadabb41e",
        allowLocalhostAsSecureOrigin: true,
      });

      console.log("OneSignal Initialized");

      OneSignal.Notifications.addEventListener("click", (event: any) => {
        const actionId = event.result.actionId;
        const additionalData: any = event.notification.additionalData;

        if (actionId === "accept_id") {
          console.log("ইউজার রক্ত দিতে রাজি হয়েছে!");
        } else if (actionId === "view_location") {
          console.log("ম্যাপ ওপেন করা হচ্ছে...");
          window.location.href =
            "/map?request_id=" + additionalData.request_id;
        } else {
          console.log("ইউজার সাধারণ নোটিফিকেশনে ক্লিক করেছে");
        }
      });
    }

    // prompt permission only when user click register
    await OneSignal.Slidedown.promptPush();

    const playerId = OneSignal.User.PushSubscription.id;

    if (playerId) {
      console.log("OneSignal Player ID:", playerId);
      return playerId;
    }

    return null;
  } catch (err) {
    console.error("OneSignal error:", err);
    return null;
  }
};
