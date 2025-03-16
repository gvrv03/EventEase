"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Send,
  X,
  Maximize2,
  Minimize2,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { useEvents } from "@/Context/EventContext";
import { useAuth } from "@/Context/AuthContext";
import { EventCommunicationCollection } from "@/config/appwrite";
import { Query } from "appwrite";
import { AddDataToCollection, ListCollectionData } from "@/Services/Appwrite";

export function EventChatBot() {
  const { eventSingle } = useEvents();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEMVEditable = eventSingle?.EMVDetails?.$id === user?.userData?.$id;

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      if (!eventSingle?.$id || !user?.userData?.$id) {
        throw new Error("Event or user information is missing.");
      }

      const receiverId = isEMVEditable
        ? eventSingle?.userDetails?.$id
        : eventSingle?.EMVDetails?.$id;

      const messagesReceiver = await ListCollectionData(
        EventCommunicationCollection,
        [
          Query.equal("ReceiverName", receiverId),
          Query.equal("SenderName", user?.userData?.$id),
        ]
      );

      const messagesSender = await ListCollectionData(
        EventCommunicationCollection,
        [
          Query.equal("ReceiverName", user?.userData?.$id),
          Query.equal("SenderName", receiverId),
        ]
      );
      

      const allMessages = [
        ...(messagesReceiver?.documents || []),
        ...(messagesSender?.documents || []),
      ].sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));

      setMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setShowTyping(true);

    const newMessage = {
      id: Date.now(),
      sender: user?.userData?.$id,
      text: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      await AddDataToCollection(
        EventCommunicationCollection,
        {
          ReceiverName: isEMVEditable
            ? eventSingle?.userDetails?.$id
            : eventSingle?.EMVDetails?.$id,
          SenderName: user?.userData?.$id,
          Message: inputValue,
        },
        user?.userData?.$id
      );
      await fetchMessages(); // Ensure messages update after sending
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Message sending failed. Please try again.");
    } finally {
      setShowTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 bg-purple-600 hover:bg-purple-700 text-white p-4"
        size="icon"
        onClick={toggleChatbot}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card
          className={`fixed bottom-20 right-4 w-80 md:w-96 shadow-xl z-50 transition-all duration-300 ${
            isMinimized
              ? "h-14"
              : "h-[500px] bg-white border border-gray-300 rounded-lg"
          }`}
        >
          <CardHeader
            className="p-3 border-b flex flex-row items-center justify-between cursor-pointer bg-purple-600 text-white rounded-t-lg"
            onClick={toggleMinimize}
          >
            <Badge variant="outline" className="ml-2 bg-purple-500 text-white">
              Talk To Event Manager / Vendor
            </Badge>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white"
                onClick={toggleMinimize}
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <ScrollArea className="h-[400px] overflow-y-auto p-3 bg-gray-100">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg?.SenderName?.$id === user?.userData?.$id
                        ? "justify-end"
                        : "justify-start"
                    } mb-2`}
                  >
                    {/* msg?.$createdAt have an TimeStamp */}
                    <div
                      className={`p-3 max-w-[75%] text-sm rounded-lg shadow ${
                        msg?.SenderName?.$id === user?.userData?.$id
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      {msg?.Message}
                    </div>
                  </div>
                ))
              )}
              {showTyping && (
                <div className="flex justify-start mb-2">
                  <div className="p-3 max-w-[75%] text-sm rounded-lg bg-white border border-gray-300 flex items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          )}

          {!isMinimized && (
            <CardFooter className="p-3 border-t flex items-center bg-white">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSendMessage}
                className="text-purple-600"
              >
                <Send className="h-5 w-5" />
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </>
  );
}
