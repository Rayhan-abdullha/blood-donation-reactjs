import OneSignal from "react-onesignal";

export async function getPremission(){
  const item = localStorage.getItem("onesignal-notification-prompt");

  if (item) {
    const parsed = JSON.parse(item);
    const status = JSON.parse(parsed.value);
  console.log('get');
  return status
  }

  return null
  
}

// ১. OneSignal ইনিশিয়ালাইজেশন ফাংশন
export const initOneSignal = async () => {
  await OneSignal.init({
    appId: "5843db1a-eeee-4650-b225-618d6419aea8",// OneSignal ড্যাশবোর্ড থেকে পাবেন
    allowLocalhostAsSecureOrigin: true,
    autoResubscribe: true,
    safari_web_id: "web.one.signal.5843db1a-eeee-4650-b225-618d6419aea8",
    promptOptions: {
      enable: true,
    } as any,
  });
};

// ২. রেজিস্ট্রেশনের সময় Player ID পাওয়ার ফাংশন
export const getOneSignalId = async () => {
  try {
    // পারমিশন চাওয়া
    await OneSignal.Notifications.requestPermission();
    
    // সাবস্ক্রিপশন আইডি (Player ID) সংগ্রহ
    const id = OneSignal.User.PushSubscription.id;
    return id; // এটি আপনার ব্যাকএন্ডে রেজিস্ট্রেশন API-র সাথে পাঠিয়ে দেবেন
  } catch (error) {
    console.error("OneSignal Error:", error);
    return null;
  }
};

// export const initOneSignal = async () => {
//   await OneSignal.init({
//     appId: "5843db1a-eeee-4650-b225-618d6419aea8", // OneSignal ড্যাশবোর্ড থেকে পাবেন
//     autoResubscribe: true,
//     allowLocalhostAsSecureOrigin: true,

//   }) as any;
// };
// // permissionManager.ts
// export const getOneSignalId = async () => {
//   try {
//    if (!OneSignal.Notifications) {
//       console.error("OneSignal is not initialized.");
//       return null;
//     } // নিশ্চিত করুন OneSignal রেডি আছে
    

//     // লগ আউট করে নতুন করে লগইন বা সাবস্ক্রাইব করার চেষ্টা
//     await OneSignal.Notifications.requestPermission();
    
//     // লাইভ সাবস্ক্রিপশন আইডি চেক
//     const id = OneSignal.User.PushSubscription.id;
//     const isSubscribed = OneSignal.User.PushSubscription.optedIn;

//     if (!isSubscribed) {
//        await OneSignal.User.PushSubscription.optIn();
//     }

//     return id;
//   } catch (error) {
//     console.error("Error getting OneSignal ID:", error);
//     return null;
//   }
// };
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

