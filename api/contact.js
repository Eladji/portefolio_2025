export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { prenom, nom, email, objet, message } = req.body;

  // Vérification basique
  if (!prenom || !nom || !email || !objet || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // URL du webhook Discord (variable d'environnement secrète)
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: 'Configuration serveur incomplète' });
  }

  try {
    // Construire le message Discord
    const discordPayload = {
      embeds: [
        {
          title: '📨 Nouveau message du portfolio',
          color: 3638016, // #d94100 en décimal
          fields: [
            { name: 'Prénom', value: prenom, inline: true },
            { name: 'Nom', value: nom, inline: true },
            { name: 'Email', value: email, inline: false },
            { name: 'Objet', value: objet, inline: false },
            { name: 'Message', value: message, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Envoyer à Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      throw new Error(`Erreur Discord: ${response.statusText}`);
    }

    return res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
}
