function IsDjVu()
{
	var SieCd = parent.frames("srvc_menu").document.frm1.siecd.value;
	return SieCd.substring(SieCd.length-3,SieCd.length).toUpperCase() == "DJV";
}

function PrintPDF()
{
	var siecd = parent.frames("srvc_menu").document.frm1.siecd.value;
	var index = parent.frames("srvc_menu").document.frm1.srvckbn.selectedIndex;
	var srvccd =parent.frames("srvc_menu").document.frm1.srvckbn.options[index].value;
	if (parent.frames("srvc_menu").document.frm1)
	{
		//20070928 電気配線図対策。_（アンダーバー）が入っていたら印刷させる。
		siecd = siecd.replace("-","_");
		var f_print = siecd.indexOf("_",0);
		if (IsDjVu() == true || (srvccd == 'S04' && f_print!=-1))
		{
			return;
		}
	}

	if (siecd == "")
	{
		alert(printmsg);
		return;
	}

	//ページ内リンク対応
	var AryUrl = parent.frames("main").location.href.split('/');
	var thisdoc = AryUrl[AryUrl.length-1];
	var thissiecd = thisdoc.substring(0,thisdoc.indexOf('.htm'));
	var url;
	var pdflink;
	var pdf;

	if (siecd != thissiecd)
	{
		siecd = thissiecd;
	}

	if(srvccd.substring(0,1) == 'A' )
	{
		pdflink = "../engine/" + srvccd + "/pdf/" + siecd + ".pdf";
	}else if(srvccd.substring(0,1) == 'B')
	{
		pdflink = "../mission/" + srvccd + "/pdf/" + siecd + ".pdf";
	}else
	{
		pdflink = "../srvc/pdf/" + siecd + ".pdf";
	}
	pdf = window.open(pdflink,siecd,"directories=no,location=no,menubar=no,resizable=yes,scrollbars=yes,toolbar=no");
	pdf.focus();
}
