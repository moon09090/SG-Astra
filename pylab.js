// Line Python Lab button: opens the native Line IDE
const pyCard=()=>`<div class="card labcard" style="text-align:center;margin-top:14px"><div style="font-size:42px">💻</div><h3 style="justify-content:center;border:0;margin:4px 0 0">Line Python Lab</h3><p class="mut" style="margin:4px 0 12px">Write and run real Python with the Line IDE.</p><button style="width:100%" onclick="enterPy()">Open Line IDE →</button></div>`;
function enterPy(){const p=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.LineIde;if(p)p.open();else alert("Line IDE works in the Android app only.")}
function afterR(){}
function PV(){return""}
TABS.py=["Lab"];
