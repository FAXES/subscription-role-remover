// 
module.exports = async function(app, connection, bot, faxstore) {
    faxstore.registerExtension({
        name: 'Subscription Role Remover',
        description: 'This extension makes roles remove when a subscription expires or ends. The associated roles with the store item are removed from the user.',
        icon: 'https://weblutions.com/i/xmKJGK.png',
        version: '1.0.0',
        author: 'FAXES',
        url: 'https://github.com/FAXES/subscription-role-remover',
    }, __filename);

    faxstore.on('subscriptionEnded', function(subscription, userId) {
        connection.query(`SELECT * FROM storeitems WHERE id = ${subscription.productId}`, function(err, item) {
            if(!item[0]) return;
            if(!item[0]?.discordRole || item[0]?.discordRole == '') return;
            faxstore.emit('removeDiscordRole', userId, item[0]?.discordRole?.split(',') || null);
        });
    });
}