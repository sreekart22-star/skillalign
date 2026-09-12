import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, HelpCircle, CheckCircle2 } from 'lucide-react';
import { LearnerProfile } from '../../types';
import { requirementsForRole, gapsForLearner } from '../../data/platformData';

interface CareerAssistantViewProps {
  learner: LearnerProfile;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  timestamp: string;
}

export const CareerAssistantView: React.FC<CareerAssistantViewProps> = ({ learner }) => {
  const role = requirementsForRole(learner.targetRole);
  const gaps = gapsForLearner(learner, role);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello ${learner.name.split(' ')[0]}! I'm your SkillAlign Career & Skill Advisor. I have analyzed your profile against the ${role.name} requirement profile. You currently have ${gaps.length} capability gaps, with ${gaps[0]?.skill || 'Cloud Fundamentals'} being your highest-priority focus. How can I help guide your learning journey today?`,
      source: 'skillalign-engine',
      timestamp: 'Just now',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const promptChips = [
    'What skills am I missing for my target role?',
    `How can I improve my match score for ${role.name}?`,
    'Suggest a high-impact portfolio project for my gaps',
    'What is the next best action I should take today?',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/career-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          learner,
          targetRole: role.name,
          roleRequirements: role.requirements,
          gaps,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          source: data.source || 'gemini-2.5-flash',
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.warn('AI Assistant API call error, using grounded deterministic fallback:', err);
    }

    // Deterministic fallback response grounded in the dataset
    setTimeout(() => {
      const gapNames = gaps.map((g) => g.skill).join(', ');
      let reply = '';

      if (textToSend.toLowerCase().includes('portfolio') || textToSend.toLowerCase().includes('project')) {
        reply = `For ${role.name}, build an applied capstone featuring ${gaps[0]?.skill || 'Cloud Architecture'}. Recommended scope: Develop a containerized service with automated unit testing, end-to-end logging, and deploy it to a cloud provider with a clear README detailing performance metrics.`;
      } else if (textToSend.toLowerCase().includes('next best') || textToSend.toLowerCase().includes('today')) {
        reply = `Your next best action is to visit the Skill Improvement Hub for ${gaps[0]?.skill || 'your core gap'}, review the curated Google/Kaggle learning resources, and complete the guided hands-on practice milestone to earn preliminary verification evidence.`;
      } else {
        reply = `For ${role.name}, your verified profile is currently below the target threshold for: ${gapNames || 'none'}. We suggest beginning with ${gaps[0]?.skill || 'a role assessment'} because it carries ${gaps[0]?.weight || 1.5}x weighted importance in our explainable placement algorithm.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        source: 'skillalign-grounded-advisor',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Bot className="size-3.5" />
            <span>Grounded Career Intelligence</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            AI Career Assistant
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Answers are strictly grounded in your active profile and the SkillAlign role requirement dataset.
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-700">
          Target: {role.name}
        </span>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {promptChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSend(chip)}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-900 shadow-2xs transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-white">
                    <Bot className="size-4 text-indigo-300" />
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-xl p-4 text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-slate-900 text-white font-medium'
                      : 'border border-slate-200 bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div
                    className={`mt-2 flex items-center justify-between text-[10px] ${
                      isUser ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.source && <span className="font-mono">Engine: {msg.source}</span>}
                  </div>
                </div>
                {isUser && (
                  <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-indigo-800">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-white">
                <Bot className="size-4 text-indigo-300" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="size-2 rounded-full bg-indigo-600 animate-pulse delay-75" />
                <span className="size-2 rounded-full bg-indigo-600 animate-pulse delay-150" />
                <span className="ml-1">Synthesizing personalized recommendation...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200 bg-slate-50/50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about your skill gaps, projects, role fit, or next steps..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition shadow-xs"
            >
              <span>Send</span>
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
