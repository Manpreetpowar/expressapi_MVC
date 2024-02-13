    //NOTIFICATION SENDING CODE*******************
    const admin = require('firebase-admin');
  sendFCMNotification = async (token, title, body) => {
    const message = {
        notification: {
            title: title,
            body: body
        },
        token: token
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
module.exports = {sendFCMNotification};