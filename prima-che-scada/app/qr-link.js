/* Local-only temporary link QR encoding; never send linking codes to an image service. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./vendor/qrcode-generator-1.4.4.js'):root.qrcode);if(typeof module==='object'&&module.exports)module.exports=api;else root.PCSPairQR=api;})(typeof window!=='undefined'?window:globalThis,function(qrcode){
 const PREFIX='PCS-LINK:1:';
 function payload(code){if(!/^[a-f0-9]{24}$/.test(code))throw Error('LINK_INVALID');return PREFIX+code;}
 function parse(value){const match=/^PCS-LINK:1:([a-f0-9]{24})$/.exec(String(value));if(!match)throw Error('LINK_INVALID');return match[1];}
 function matrix(code){const qr=qrcode(0,'M');qr.addData(payload(code),'Byte');qr.make();return qr;}
 function svg(code){return matrix(code).createSvgTag({cellSize:6,margin:24,alt:'QR temporaneo per collegare un tuo dispositivo a Prima che scada'});}
 return {payload,parse,matrix,svg};
});
