var framesTop = parent.parent;

var LoadDiv = '<DIV ONCLICK="loadFrame(true);" CLASS="clsLoadMsg">';
L_LoadingMsg_HTMLText = LoadDiv + L_LoadingMsg_HTMLText + "</LI>";

function caps(){
    var UA = navigator.userAgent;
    if(UA.indexOf("MSIE") != -1){
        this.ie = true;
        var v = UA.charAt(UA.indexOf("MSIE") + 5);
        if(v == 2 ) this.ie2 = true;
        else if(v == 3 ) this.ie3 = true;
        else if(v == 4 ) this.ie4 = true;
        else if(v == 5 ) this.ie5 = true;
        if(this.ie4 || this.ie5) this.UL = true;
    }else if(UA.indexOf("Mozilla") != -1 && UA.indexOf("compatible") == -1){
        this.nav = true;
        var v = UA.charAt(UA.indexOf("Mozilla") + 8);
        if(v == 2 ) this.nav2 = true;
        else if(v == 3 ) this.nav3 = true;
        else if(v == 4 ) this.nav4 = true;
    }
    if(UA.indexOf("Windows 95") != -1 || UA.indexOf("Win95") != -1 || UA.indexOf("Win98") != -1 || UA.indexOf("Windows 98") != -1 || UA.indexOf("Windows NT") != -1) this.win32 = true;
    else if(UA.indexOf("Windows 3.1") != -1 || UA.indexOf("Win16") != -1) this.win16 = true;
    else if(UA.indexOf("Mac") != -1) this.anymac = true;
    else if(UA.indexOf("SunOS") != -1 || UA.indexOf("HP-UX") != -1 || UA.indexOf("X11") != -1) this.unix = true;
    else if(UA.indexOf("Windows CE") != -1) this.wince = true;
}

var bc = new caps();

var L_LoadingMsg_HTMLText = "Now Reading ";

var initialflag = 0;

var eCurrentObj = null;

////////////////////////////////////////////
// Not sure why this is here, it puts a scrollbar up when none is needed
// if("object" == typeof(parent.document.all.fraPaneToc)) parent.document.all.fraPaneToc.scrolling = "yes";
////////////////////////////////////////////

var eSynchedNode = null;
var eCurrentUL = null;
var eCurrentLI = null;
var bLoading = false;

function loadFrame( bStopLoad )
{
    if( "object" == typeof( eCurrentUL ) && eCurrentUL && !bStopLoad ) 
    {
      eCurrentUL.innerHTML = hiddenframe.chunk.innerHTML;
      eCurrentUL = null;
      bLoading = false;
    }
    else if( "object" == typeof( eCurrentUL ) && eCurrentUL )
    {
      eCurrentUL.parentElement.children[1].className = "";
 
				if(parent.frames("left_menu").location.href.indexOf('/esicont/engine/') != -1)
				{
					//engine
				  eCurrentUL.parentElement.children[0].src = "../../../esi_common/images/plus2.png";
				}else if (parent.frames("left_menu").location.href.indexOf('/esicont/mission/') != -1)
				{
					//mission
				  eCurrentUL.parentElement.children[0].src = "../../../esi_common/images/plus2.png";
				}else
				{
					//srvc
				  eCurrentUL.parentElement.children[0].src = "../../esi_common/images/plus2.png";

				}
//	  eCurrentUL.parentElement.children[0].src = "/esicont/esi_common/images/plus2.png";
      eCurrentUL.parentElement.className = "kid";
      eCurrentUL.className = "clsHidden";
      eCurrentUL.innerHTML="";
      eCurrentUL = null;
      bLoading = false;
    }
    else
    {
      bLoading = false;
    }
    return;
}

function GetNextUL(eSrc)
{
    var eRef = eSrc;
    for(var i = 0; i < eRef.children.length; i++) if("UL" == eRef.children[i].tagName) return eRef.children[i];
    return false;
}

function MarkSync(eSrc)
{
    if("object" == typeof(aNodeTree)) aNodeTree = null;
    if("LI" == eSrc.tagName.toUpperCase() && eSrc.children[1] && eSynchedNode != eSrc )
    {
        UnmarkSync();
        eSrc.children[1].style.fontWeight = "bold";
        eSynchedNode = eSrc;
    }
}

function UnmarkSync()
{
    if("object" == typeof(eSynchedNode) && eSynchedNode )
    {
        eSynchedNode.children[1].style.fontWeight = "normal";
        eSynchedNode = null;
    }
}

function MarkActive(eLI)
{
    if("object" == typeof( eLI ) && eLI && "LI" == eLI.tagName.toUpperCase() && eLI.children[1])
    {
		window.eCurrentLI = eLI;
		MarkInActive();
		if (window.eCurrentLI.children[1].target == "main" && initialflag == 1)
		{
	 		window.eCurrentLI.children[1].className = "clsCurrentLI";
			eCurrentObj = window.eCurrentLI;
		}
		initialflag = 1;
    }
}

function MarkInActive()
{
    if( "object" == typeof( eCurrentLI ) && eCurrentLI &&  "object" == typeof( eCurrentObj ) && eCurrentObj )
    {
		if (window.eCurrentLI.children[1].target == "main")
		{
			eCurrentObj.children[1].className = "";
			eCurrentObj = null;
		}
    }
}

function Navigate_URL( eSrc )
{
    var eLink = eSrc.parentElement.children[1];
	    urlIdx = eLink.href.indexOf( "URL=" );

    if("object" == typeof(framesTop.main) && eLink && "A" == eLink.tagName && urlIdx != -1 )
    {
        if(eLink.target=="main"||eLink.target=="_top")
        {
            framesTop.main.location.href = eSrc.parentElement.children[1].href.substring( urlIdx + 4 );
        }else
        {
            window.open(eSrc.parentElement.children[1].href,eLink.target);
        }
        MarkSync(eSrc.parentElement);
    }else if("object" == typeof(framesTop.main) && eLink && "A" == eLink.tagName  && eLink.href.indexOf( "tocPath=" ) == -1)
    {
        if(eLink.target=="main")
        {
			parent.frames("srvc_menu").document.frm1.siecd.value = eSrc.parentElement.children[1].name;
			parent.frames("main").location.href = eSrc.parentElement.children[1].name + '.html';
        }
        
        else if( eLink.target=="_top" )
        {
            top.location = eLink.href;
            return;
        }
	        MarkSync(eSrc.parentElement);
    }
    else if( eSynchedNode != eSrc.parentElement && ( urlIdx != -1 || ( eLink.href.indexOf( "javascript:" ) == -1 && eLink.href.indexOf( "tocPath=" ) == -1 ) ) )
    {
        MarkSync( eSrc.parentElement );
    }
}

function Image_Click( eSrc , bLeaveOpen )
{
	var eLink = eSrc.parentElement.children[1];

	if("noHand" != eSrc.className)
	{
		eLI = eSrc.parentElement;
		MarkActive(eLI);
		var eUL = GetNextUL(eLI);
		if(eUL && "kidShown" == eLI.className)
        {
            // hide on-page kids
            if( !bLeaveOpen )
            {
                eLI.className = "kid";
                eUL.className = "clsHidden";

				if(parent.frames("left_menu").location.href.indexOf('/esicont/engine/') != -1)
				{
					//engine
		            eSrc.src = "../../../esi_common/images/plus2.png";
				}else if (parent.frames("left_menu").location.href.indexOf('/esicont/mission/') != -1)
				{
					//mission
		            eSrc.src = "../../../esi_common/images/plus2.png";
				}else
				{
					//srvc
		            eSrc.src = "../../esi_common/images/plus2.png";
				}
//                eSrc.src = "/esicont/esi_common/images/plus2.png";
            }
        }
        else if(eUL && eUL.all.length && "kid" == eLI.className)
        {
            // show on-page kids
            eLI.className = "kidShown";
            eUL.className = "clsShown";

				if(parent.frames("left_menu").location.href.indexOf('/esicont/engine/') != -1)
				{
					//engine
		            eSrc.src = "../../../esi_common/images/minus2.png";
				}else if (parent.frames("left_menu").location.href.indexOf('/esicont/mission/') != -1)
				{
					//mission
		            eSrc.src = "../../../esi_common/images/minus2.png";
				}else
				{
					//srvc
		            eSrc.src = "../../esi_common/images/minus2.png";
				}

//            eSrc.src = "/esicont/esi_common/images/minus2.png";
        }
        else if("kid" == eLI.className)
        {
            // load off-page kids
            if( !bLoading )
            {
                bLoading = true;
                eLI.className = "kidShown";
                eUL.className = "clsShown";
                window.eCurrentUL = eUL;

				if(parent.frames("left_menu").location.href.indexOf('/esicont/engine/') != -1)
				{
					//engine
					eSrc.src = "../../../esi_common/images/minus2.png";
				}else if (parent.frames("left_menu").location.href.indexOf('/esicont/mission/') != -1)
				{
					//mission
					eSrc.src = "../../../esi_common/images/minus2.png";
				}else
				{
					//srvc
					eSrc.src = "../../esi_common/images/minus2.png";
				}
//                eSrc.src = "/esicont/esi_common/images/minus2.png";
                eUL.innerHTML = L_LoadingMsg_HTMLText;
                var strLoc = eLink.href;
                // use standard frames reference for hidden frame loading
                window.frames["hiddenframe"].location.replace(strLoc);
            }
        }
    }
}

function Toc_click(event)
{
    var eSrc = parentElementRepeatLI(event.target || event.srcElement);
    if (eSrc == null){
        return false;
    }
    event.preventDefault();
    if("A" == eSrc.tagName.toUpperCase() && "LI" == eSrc.parentElement.tagName)
    {
        var eImg = eSrc.parentElement.children[0];
        if(eImg) eImg.click();
    }
    else if("SPAN" == eSrc.tagName && "LI" == eSrc.parentElement.tagName)
    {
        var eImg = eSrc.parentElement.children[0];
        if(eImg) eImg.click();
    }
    else if("IMG" == eSrc.tagName)
    {
        Image_Click( eSrc , false );
        Navigate_URL( eSrc );
    }
    return false;
}

function Toc_dblclick()
{
	return;
}

function mouse_over(event)
{
    var eSrc = event.target || event.srcElement;
}

function window_load()
{
    var sheet = document.styleSheets[0];
    if(typeof ulRoot === "object" && sheet && sheet.insertRule)
    {
        window.eSynchedNode = document.getElementById("eSynchedNode");
        sheet.insertRule("UL.clsHidden {display:none}", 0);
        sheet.insertRule("UL.hdn {display:none}", 0);
        // attach event listeners using standard model
        ulRoot.addEventListener('click', Toc_click);
        ulRoot.addEventListener('dblclick', Toc_dblclick);
        document.addEventListener('mouseover', mouse_over);
        if( window.eSynchedNode )
        {
            MarkActive(window.eSynchedNode);
            var bTags = window.eSynchedNode.getElementsByTagName("B");
            if (bTags.length > 0) {
                bTags[0].outerHTML = bTags[0].innerHTML;
            }
            window.scrollTo(0,window.eSynchedNode.offsetTop-(document.body.clientHeight/2));
        }
        else
        {
            var liTags = document.getElementsByTagName("LI");
            if (liTags.length > 0) {
                MarkActive(liTags[0]);
            }
        }
    }
}

window.onload = window_load;

function NoOp()
{
	return;
}

//LIが出るまで繰り返す
function parentElementRepeatLI(eSrc)
{
        if(!eSrc) return null;
        var parent = eSrc.parentElement || eSrc.parentNode;
        var tagName = parent.tagName;
        if(tagName == "LI"){
                return eSrc;
        }else if(tagName != "HTML"){
                return parentElementRepeatLI(parent);
        }
        return null;
}
