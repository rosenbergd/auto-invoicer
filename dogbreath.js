var PDFDocument;
var doc;
//data
//function to receive data
var obj;
var totalEnd;

function dogbreath(){
	PDFDocument = require('pdfkit');
	doc = new PDFDocument();
	doc.info['Title'] = 'Invoice Document';
	obj = "";
	totalEnd=0.0;
}

dogbreath.prototype.generate = function(object){
	obj = object;
}
dogbreath.prototype.writer = function(){
//add image
doc.image('Invirohub_Small.jpg', 400, 60, {fit:[150, 150]});
//font size (default)
doc.fontSize(12);
//write text of details of customer
doc.lineWidth(0.5);
doc.text("Name: "+obj.customer.name);
doc.moveTo(110,82).lineTo(250, 82).stroke();
doc.moveDown();
doc.text("Address: "+obj.customer.address);
doc.moveTo(122,109).lineTo(392, 109).stroke();
doc.moveDown();
doc.text("Date: "+obj.customer.date);
doc.moveTo(103,137).lineTo(183, 137).stroke();

//draw table
doc.lineWidth(1);
doc.moveTo(70,167).lineTo(550, 167).stroke();//top line of table
doc.moveTo(70,167).lineTo(70, 190).stroke();//left line of table
doc.moveTo(550,167).lineTo(550, 190).stroke();//right line of table
doc.moveTo(70,190).lineTo(550, 190).stroke();//first margin
doc.moveTo(135,167).lineTo(135, 190).stroke();//first end line for quantity
doc.moveTo(380,167).lineTo(380, 190).stroke();//end line for description
doc.moveTo(465,167).lineTo(465, 190).stroke();//end line for price
doc.moveDown();
doc.moveDown(1.5);
doc.text("QUANTITY                         DESCRIPTION                               PRICE               TOTAL");
//information
var begin = 190;
var end = 210;
for (var i in obj.customer.items) {
	//add data and table border
	doc.moveTo(70,begin).lineTo(70, end).stroke();//left line of table
	doc.moveTo(550,begin).lineTo(550, end).stroke();//right line of table
	doc.moveTo(135,begin).lineTo(135, end).stroke();//first end line for quantity
	doc.moveTo(380,begin).lineTo(380, end).stroke();//end line for description
	doc.moveTo(465,begin).lineTo(465, end).stroke();//end line for price
	doc.text(obj.customer.items[i].quantity, 70, begin+5, {
		width: 65,
		align: "center"
	});//quantity
	doc.text(obj.customer.items[i].description, 140, begin+5);//description
	doc.text(obj.customer.items[i].price, 380, begin+5,{
		width: 85,
		align: "right"
	});//price
	doc.text(((obj.customer.items[i].quantity)*(obj.customer.items[i].price)), 465, begin+5,{
		width: 85,
		align: "right"
	});//total
	totalEnd+=((obj.customer.items[i].quantity)*(obj.customer.items[i].price));
	begin=end;
	end+=20;
	if(begin>=690){
		doc.moveTo(70,690).lineTo(550, 690).stroke();
		doc.fontSize(6);
		doc.text('Invirohub pty(ltd)', 70, 706,{
			width: 480,
			align: "center"
		}).fill('gray');
		doc.fontSize(12);
		doc.addPage();
		//add image
		doc.image('Invirohub_Small.jpg', 400, 60, {fit:[150, 150]});
		
		//write text of details of customer
		doc.lineWidth(0.5);
		doc.text("Name: "+obj.customer.name);
		doc.moveTo(110,82).lineTo(250, 82).stroke();
		doc.moveDown();
		doc.text("Address: "+obj.customer.address);
		doc.moveTo(122,109).lineTo(392, 109).stroke();
		doc.moveDown();
		doc.text("Date: "+obj.customer.date);
		doc.moveTo(103,137).lineTo(183, 137).stroke();

		//draw table
		doc.lineWidth(1);
		doc.moveTo(70,167).lineTo(550, 167).stroke();//top line of table
		doc.moveTo(70,167).lineTo(70, 190).stroke();//left line of table
		doc.moveTo(550,167).lineTo(550, 190).stroke();//right line of table
		doc.moveTo(70,190).lineTo(550, 190).stroke();//first margin
		doc.moveTo(135,167).lineTo(135, 190).stroke();//first end line for quantity
		doc.moveTo(380,167).lineTo(380, 190).stroke();//end line for description
		doc.moveTo(465,167).lineTo(465, 190).stroke();//end line for price
		doc.moveDown();
		doc.moveDown(1.5);
		doc.text("QUANTITY                         DESCRIPTION                                 PRICE               TOTAL");
		//information
		var begin = 190;
		var end = 210;
	}
}
//end of table
doc.moveTo(70,begin).lineTo(550, begin).stroke();//end of table (line)
doc.moveTo(465,begin).lineTo(465, end).stroke();//left of SUBTOTAL box
doc.moveTo(550,begin).lineTo(550, end).stroke();//right of SUBTOTAL box
doc.text("SUBTOTAL", 400, begin+5);//SUBTOTAL box text:
doc.text(totalEnd, 465, begin+5,{
		width: 85,
		align: "right"
	});//SUBTOTAL (obj.customer.total)
begin=end;
end+=20;

doc.moveTo(465,end).lineTo(550, end).stroke();//end of VAT box
doc.moveTo(465,begin).lineTo(465, end).stroke();//left of VAT box
doc.moveTo(550,begin).lineTo(550, end).stroke();//right of VAT box
doc.text("VAT", 440, begin+5);//VAT box text:
doc.text(obj.customer.vat, 465, begin+5,{
		width: 85,
		align: "right"
	});//VAT
begin=end;
end+=20;

doc.moveTo(465,end).lineTo(550, end).stroke();//end of TOTAL box
doc.moveTo(465,begin).lineTo(465, end).stroke();//left of TOTAL box
doc.moveTo(550,begin).lineTo(550, end).stroke();//right of TOTAL box
doc.text("TOTAL", 425, begin+5);//Total box text:

var vatEnd = obj.customer.vat;
vatEnd/=100;
vatEnd+=1;
var totalVat = (totalEnd*vatEnd)*100;

doc.text((Math.round(totalVat))/100, 465, begin+5,{
		width: 85,
		align: "right"
	});//total (obj.customer.total)
doc.fontSize(6);
doc.text('Invirohub pty(ltd)', 70, 706,{
	width: 480,
	align: "center"
}).fill('gray');
doc.fontSize(12);

//write to file
doc.write('out.pdf');
}
module.exports = dogbreath;