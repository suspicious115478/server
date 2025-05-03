const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
app.use(cors());

const APP_ID = "a4fa06c6398649f3a448f6ee48992f6b";         // <-- replace this
const APP_CERTIFICATE = "a07ec2d7c01e44a9bb61a8f7182738b8";    // <-- replace this

app.get('/generate-token', (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) {
        return res.status(400).json({ error: 'channelName is required' });
    }

    const uid = 0;
    const role = RtcRole.PUBLISHER;
    const expireTime = 3600; // 1 hour
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime
    );

    return res.json({ token });
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Token server running on port 5000');
});
