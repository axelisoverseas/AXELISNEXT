import React, { useState } from 'react';
import { MessageCircle, CheckCircle, XCircle, Loader, Send } from 'lucide-react';
import { testWhatsAppConnection, sendDirectMessage } from '../services/whatsappService';

const WhatsAppTest = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [sendingCustom, setSendingCustom] = useState(false);

  const runTest = async () => {
    setTesting(true);
    setResult(null);

    try {
      const testResult = await testWhatsAppConnection();
      setResult(testResult);
    } catch (error) {
      setResult({ success: false, error: error.message, provider: 'AiSensy' });
    } finally {
      setTesting(false);
    }
  };

  const sendCustomMessage = async () => {
    if (!customMessage.trim()) return;

    setSendingCustom(true);
    try {
      // Format the phone number correctly
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NOTIFICATION_NUMBER;
      const formattedNumber = phoneNumber?.length === 10 ? '91' + phoneNumber : phoneNumber;

      const result = await sendDirectMessage(formattedNumber, customMessage);
      setResult(result);
      if (result.success) {
        setCustomMessage('');
      }
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setSendingCustom(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-4 border border-gray-200 min-w-[320px] max-w-[400px]">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <MessageCircle className="mr-2 text-green-600" size={18} />
          AiSensy WhatsApp API Test ({process.env.NEXT_PUBLIC_WHATSAPP_NOTIFICATION_NUMBER})
        </h4>
        
        {/* Test API Button */}
        <button
          onClick={runTest}
          disabled={testing}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg flex items-center justify-center transition-colors mb-3"
        >
          {testing ? (
            <>
              <Loader className="mr-2 animate-spin" size={16} />
              Testing AiSensy API...
            </>
          ) : (
            'Test AiSensy WhatsApp API'
          )}
        </button>

        {/* Custom Message */}
        <div className="mb-3">
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Send custom test message..."
            className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"
            rows="2"
          />
          <button
            onClick={sendCustomMessage}
            disabled={sendingCustom || !customMessage.trim()}
            className="w-full mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded text-sm flex items-center justify-center"
          >
            {sendingCustom ? (
              <>
                <Loader className="mr-1 animate-spin" size={14} />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-1" size={14} />
                Send Custom Message
              </>
            )}
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`p-3 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center mb-2">
              {result.success ? (
                <CheckCircle className="text-green-600 mr-2" size={16} />
              ) : (
                <XCircle className="text-red-600 mr-2" size={16} />
              )}
              <span className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.success ? 'AiSensy API Working!' : 'AiSensy API Failed'}
              </span>
            </div>
            <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
              {result.success ? `Check your WhatsApp (${process.env.NEXT_PUBLIC_WHATSAPP_NOTIFICATION_NUMBER})` : result.error}
            </p>
            {result.messageId && (
              <p className="text-xs text-green-600 mt-1">
                Message ID: {result.messageId}
              </p>
            )}
            {result.provider && (
              <p className="text-xs text-gray-600 mt-1">
                Provider: {result.provider}
              </p>
            )}
            {result.fallbackUsed && (
              <p className="text-xs text-orange-600 mt-1">
                ⚠️ Fallback used: WhatsApp Web opened
              </p>
            )}
          </div>
        )}

        <div className="mt-3 text-xs text-gray-500">
          Press Ctrl+Shift+W to toggle this panel
        </div>
      </div>
    </div>
  );
};

export default WhatsAppTest;