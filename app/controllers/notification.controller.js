const db = require('./../models');
const Notification = db.notification;

exports.createNotification = (userId, activity, type, icon, isRead=false, global=false) => {
    try {
        const notification = new Notification({
            user: userId,
            activity: activity,
            type: type,
            isRead: isRead,
            icon: icon,
            global: global
        });
        notification.save().then(
            (notif) => {
                console.log(notif);
            }
        ).catch(
            err => {console.log(err);}
        )
    } catch (err) {
        console.log(err);
    }
}

exports.getUserNotification = async (req, res) => {
    try {
        const userId = req.query.user;
        console.log(userId);
        Notification.find({user: userId}).then(
            result => {
                if(!result){
                    res.status(500).send({message: 'User Not Found'});
                    return;
                }
                res.status(200).send(result);
            }
        ).catch(
            err => { console.log(err); }
        )
    } catch (error) {
        console.log(error);
    }
}


exports.getNotificationIsRead = async (req, res) => {
    try {
        const userId = req.query.userId;
        const notifId = req.query.notification;
        const correct = req.query.read;
        if(correct === 'true'){
            Notification.findOneAndUpdate({user: userId, notificationId: notifId},
                {isRead: true }, {useFindAndModify: false , new: true},  function(err, result) {
                    if (err){
                        res.status(500).send({message: 'Cannot find notification'});
                        return;
                    }
                    res.status(200).send(result);
                })
            return; 
        }
        res.status(500).send({message: 'Link not found!'})

    } catch (err) {
        console.log(err);
    }
}


exports.deleteUserNotification = async (req, res) => {
    try {
        const userId = req.query.user;
        const notifId = req.query.notification;

        Notification.findOneAndDelete({user: userId, notificationId: notifId}, function(err, docs) {
            if(err){
                res.status(500).send({message: 'Something wrong in deleting notification'})
                return;
            } 
            res.status(200).send({message: 'Successfully deleted notification'});
        })
    } catch (error) {
        console.log(error);
    }
}



