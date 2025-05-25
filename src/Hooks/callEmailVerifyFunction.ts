import { Alert } from "react-native";

export const callEmailVerifyFunction = async (email: string, handleSubmit: ((arg0: number) => void) | undefined) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "AI Assistant <devlinkadmin@devlink.pro>",
          to: [email],
          subject: "AI Assistant Email Verification",
          html: `<p>Enter the code into the verification screen and your email will be validated</strong><strong> <br/>${randomCode}</strong>`,
        }),
      });
  
      const data = await res.json();
      console.log("data", data);
      if (res.status === 200) {
        handleSubmit && handleSubmit(randomCode);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };
  