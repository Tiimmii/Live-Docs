// import { liveblocks } from "@/lib/liveblocks";
// import { currentUser } from "@clerk/nextjs/server";
// import { WebhookHandler } from "@liveblocks/node";

// // Add your webhook secret key from a project's webhooks dashboard
// const WEBHOOK_SECRET = process.env.LIVEBLOCKS_WEBHOOK_SECRET;
// const webhookHandler = new WebhookHandler(WEBHOOK_SECRET);

// export default async function handler(req, res) {
//     const clerkUser = await currentUser();
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const body = req.body;

//   // Verify if this is a real webhook request
//   let event;
//   try {
//     event = webhookHandler.verifyRequest({
//       headers: req.headers,
//       rawBody: JSON.stringify(body),
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).json({ error: "Could not verify webhook call" });
//   }

//   // Handle the webhook event
//   if (event.type === "notification") {
//     const { inboxNotificationId, userId } = event.data;

//     // Get the inbox notification
//     const inboxNotification = await liveblocks.getInboxNotification({
//       inboxNotificationId,
//       userId,
//     });

//     console.log('inboxnot: ',inboxNotification)

//   //   // Implement your email sending logic
//   //   const emailAddress = getUserEmail(userId); // Replace with your logic
//   //   sendEmail({
//   //     from: "hello@my-company.com",
//   //     to: emailAddress,
//   //     title: "New comment",
//   //     html: `
//   //       <h1>New notification</h1>
//   //       <a href="...">Learn more</a>
//   //     `,
//   //   });
//   // }

//   return res.status(200).end();
// }

// // // Mock email functions for demonstration
// // const getUserEmail = (userId: string) => `${userId}@example.com`; // Replace with actual logic
// // const sendEmail = ({ from, to, title, html }) => {
// //   console.log(`Sending email to ${to} from ${from}: ${title}`);
// // };
