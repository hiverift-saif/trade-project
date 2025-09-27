import React, { useState } from 'react';
import { Check, Settings, Search, Edit, ChevronRight, X } from 'lucide-react';

function ChatMenuTab({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Chats");

  const chatItems = [
    {
      id: 1,
      avatar: "https://pocketoption.com/uploads/users/9d/e3/d9/2_user.png",
      title: "Support Chat (Online)",
      time: "Yesterday, 15:09",
      message: "Welcome to the Support Chat! Here you can get a quick...",
      unread: 1,
    },
    {
      id: 2,
      avatar: "https://chat-po.site/uploads/avatars/default/chat-icon-en.png?v=1",
      title: "General chat (English)",
      time: "14:24",
      message: "I was getting withdrawal faster than nowadays. for...",
      unread: 2163,
    },
    {
      id: 3,
      avatar: "https://chat-po.site/uploads/avatars/default/chat-icon-analitics.png?v=1",
      title: "Analytics",
      time: "Yesterday, 22:40",
      message: "EUR/JPY: Ichimoku indicators analysis See more",
      unread: 15,
    },
    {
      id: 4,
      avatar: "https://chat-po.site/cabinet/images/avatars/10.png",
      title: "Support",
      time: "Yesterday, 15:09",
      message: "You have a new message from support. See more",
      unread: 1,
    },
    {
      id: 5,
      avatar: "https://chat-po.site/uploads/avatars/default/chat-icon-promo.png?v=1",
      title: "Promo",
      time: "28 Aug, 16:58",
      message: "Limited Offer For ClientsUse FLASH100 and get a 100%...",
      unread: 0,
    },
    {
      id: 6,
      avatar: "https://chat-po.site/uploads/avatars/default/chat-icon-news.png?v=1",
      title: "News",
      time: "16 Jul, 14:35",
      message: "Risk-Free Trade with Ultrade\nWe’re introducing a new...",
      unread: 0,
    },
  ];

  const notificationItems = [];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 md:w-80 md:static md:flex md:flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="chat_main">
          <div className="chat_main_header">
            <div className="chat_main_actions flex items-center gap-2 p-2">
              <button className="chat_btn chat_btn_icon p-1 rounded hover:bg-zinc-700">
                <Check size={16} className="chat_icon text-zinc-400" />
              </button>
              <button className="chat_btn chat_btn_icon p-1 rounded hover:bg-zinc-700">
                <Settings size={16} className="chat_icon text-zinc-400" />
              </button>
              <div className="chat_main_search flex items-center bg-zinc-800 rounded p-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-zinc-200 outline-none w-24"
                />
                <Search size={16} className="chat_icon text-zinc-400 ml-1" />
              </div>
              <button className="chat_btn chat_btn_icon p-1 rounded hover:bg-zinc-700">
                <Edit size={16} className="chat_icon text-zinc-400" />
              </button>
            </div>
            <div className="chat_main_navs mt-2">
              <ul className="chat_tabs_nav flex space-x-4">
                <li>
                  <button
                    className={`s-active ${activeTab === "Chats" ? "text-white" : "text-zinc-400"}`}
                    onClick={() => setActiveTab("Chats")}
                  >
                    Chats <span className="chat_number bg-blue-600 text-white text-xs rounded-full px-1 ml-1">2</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`${activeTab === "Notifications" ? "text-white" : "text-zinc-400"}`}
                    onClick={() => setActiveTab("Notifications")}
                  >
                    Notifications{" "}
                    <span className="chat_number bg-blue-600 text-white text-xs rounded-full px-1 ml-1">2</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="os-host scroll_container os-theme-dark h-[calc(100%-4rem)] overflow-y-auto">
            <div className="os-content p-2">
              <div className={`chat_tab ${activeTab === "Chats" ? "s-tab_active" : "hidden"}`}>
                <div className="chat_list">
                  {chatItems.map((item) => (
                    <div key={item.id} className="chat_list_inner flex items-center p-2 hover:bg-zinc-800/50 rounded">
                      <div className="chat_list_image w-10 h-10">
                        <div className="chat_avatar_circle w-10 h-10 rounded-full overflow-hidden">
                          <div
                            className="chat_avatar_circle_bg w-full h-full bg-cover"
                            style={{ backgroundImage: `url(${item.avatar})` }}
                          ></div>
                        </div>
                      </div>
                      <div className="chat_list_content flex-1 ml-2">
                        <div className="chat_list_main flex justify-between">
                          <div className="chat_title one_line text-sm font-medium text-white">
                            <span className="one_line">{item.title}</span>
                          </div>
                          <div className="chat_time text-xs text-zinc-400">{item.time}</div>
                        </div>
                        <div className="chat_list_message flex justify-between mt-1">
                          <p className="one_line text-xs text-zinc-400">{item.message}</p>
                          {item.unread > 0 && (
                            <i className="chat_number bg-blue-600 text-white text-xs rounded-full px-1">{item.unread}</i>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`chat_tab ${activeTab === "Notifications" ? "s-tab_active" : "hidden"}`}>
                <div className="text-zinc-400 text-sm p-2">No notifications yet.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMenuTab;