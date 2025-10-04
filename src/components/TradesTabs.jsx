import React, { useState } from 'react';
import Pill from './Pill';
import { formatMoney } from '../utils/formatMoney';

function TradesTabs({ opened, closed }) {
  const [tab, setTab] = useState("Opened");
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between px-3">
        <div className="text-zinc-300 font-medium text-base">Trades</div>
        <div className="flex text-sm">
          {[
            { k: "Opened", c: opened.length },
            { k: "Closed", c: closed.length },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-4 py-2 border-b-2 font-medium ${
                tab === t.k ? "border-sky-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"
              } transition-all duration-200`}
            >
              {t.k}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px] sm:h-52 md:h-full overflow-auto p-3 space-y-2">
        {(tab === "Opened" ? opened : closed).length === 0 ? (
          <div className="text-zinc-500 text-sm font-medium">No {tab.toLowerCase()} trades</div>
        ) : (
          <ul className="space-y-3">
            {(tab === "Opened" ? opened : closed).map((t) => (
              <li
                key={t.id}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-lg p-3 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Pill variant={t.side === "BUY" ? "green" : "red"}>{t.side}</Pill>
                  <div>
                    <div className="text-zinc-200 text-sm font-medium">{t.asset.symbol}</div>
                    <div className="text-xs text-zinc-500">
                      Amt ${formatMoney(t.amount)} • Payout {Math.round(t.payout * 100)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {t.closed ? (
                    <div className={`${t.profit >= 0 ? "text-emerald-400" : "text-red-400"} font-medium`}>
                      {t.profit >= 0 ? "+" : ""}${formatMoney(t.profit)}
                    </div>
                  ) : (
                    <div className="text-zinc-400 text-sm font-medium">{t.remaining}s</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TradesTabs;