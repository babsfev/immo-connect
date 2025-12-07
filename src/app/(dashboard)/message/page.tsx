import { getConversations } from "@/app/data/messages";
import { getUserMe } from "@/app/data/user";
import { ChatInterface } from "@/components/messages/ChatInterface";

export const metadata = {
  title: "Messagerie | ImmoConnect",
};

export default async function MessagesPage() {
  const [conversations, user] = await Promise.all([
    getConversations(),
    getUserMe()
  ]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Messagerie</h1>
        <p className="text-slate-500 text-sm">Gérez vos échanges avec vos locataires et prestataires.</p>
      </div>
      
      <ChatInterface 
        conversations={conversations} 
        currentUser={{ id: user.id, role: user.roles[0] || "PROSPECT" }} 
      />
    </div>
  );
}