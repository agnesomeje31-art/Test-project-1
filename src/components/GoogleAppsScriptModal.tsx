import React, { useState } from 'react';
import { GOOGLE_APPS_SCRIPT_CODE, SCRIPT_ID, SCRIPT_URL } from '../utils/googleAppsScript';
import { FileSpreadsheet, Copy, Check, X, Code2, Sparkles, Link2, CheckCircle2 } from 'lucide-react';

interface GoogleAppsScriptModalProps {
  onClose: () => void;
}

export const GoogleAppsScriptModal: React.FC<GoogleAppsScriptModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(SCRIPT_URL);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-stone-900 text-white rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-100 flex items-center gap-2">
                <span>Google Apps Script & Excel Automation</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-amber-300/80">
                Automatic Excel / Google Sheets response entry + WhatsApp message generator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-300">
          
          {/* Active Script URL Badge */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-emerald-200">Active Script URL Connected</span>
              </div>
              <p className="font-mono text-[11px] text-stone-300 break-all">
                ID: <span className="text-amber-300 font-semibold">{SCRIPT_ID}</span>
              </p>
            </div>

            <button
              onClick={handleCopyUrl}
              className="px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'URL Copied!' : 'Copy Script URL'}</span>
            </button>
          </div>

          {/* Quick Setup Instructions */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
            <h4 className="font-bold text-sm text-amber-200 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>How to setup automatic Excel entry in 3 simple steps:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-stone-300 leading-relaxed pl-1">
              <li>Open your Google Sheet (or Google Form linked spreadsheet) and click <strong>Extensions &gt; Apps Script</strong>.</li>
              <li>Delete any existing template code and paste the script below into <strong>Code.gs</strong>.</li>
              <li>Click <strong>Deploy &gt; New deployment &gt; Web app</strong> (Set "Who has access" to "Anyone") and save!</li>
            </ol>
          </div>

          {/* Copyable Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                Code.gs (Google Apps Script)
              </span>

              <button
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-rose-950 font-black text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-rose-950" />
                    <span>COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY SCRIPT CODE</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[11px] leading-relaxed text-amber-200/90 overflow-x-auto max-h-72 select-all">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 text-[11px] text-stone-400 flex items-center justify-between">
            <span>Note: You can also export current live orders directly from the "Orders" button in the navigation bar anytime!</span>
            <span className="text-amber-400 font-bold">Target WhatsApp: 07055609012</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-bold text-xs"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
