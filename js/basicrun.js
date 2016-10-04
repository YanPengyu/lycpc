function windowsclass(clikeclass, opendivclass, clikeclass02, opendivclass02, vallist, taplen, stylename, overstylename) {
	$(clikeclass).removeClass(overstylename).addClass(stylename);
	$(opendivclass).show();
	var openid = '';
	var opendivid = '';
	for (i = 1; i <= taplen; i++) {
		if (i != vallist) {
			openid = openid + '#' + clikeclass02 + i + ',';
			opendivid = opendivid + '#' + opendivclass02 + i + ','
		}
	}
	openid = openid + '#neiow';
	opendivid = opendivid + '#neiow';
	$(opendivid).hide();
	$(openid).removeClass(stylename).addClass(overstylename)
}
function sessionimg(inputname, url) {
	var imgtitle = url + 'public/seccode.php?rd=' + Math.random();
	$("#" + inputname).attr("src",
	function() {
		return imgtitle
	})
}
function messform(seccodetype) {
	if (document.messformsave.name.value == "" || document.messformsave.content.value == "") {
		document.messformsave.name.focus();
		alert(forum_input_err);
		return false
	}
	if (seccodetype == '1' && document.messformsave.seccode.value.match(/^[A-Z]{4}$/ig) == null) {
		document.messformsave.seccode.focus();
		alert(seccode_empty);
		return false
	}
}
function memberlogin(seccodetype) {
	if (document.mainform.username.value.match(/^[^!@~`\'\"#\$\%\^&\*\(\)\+\-\{\}\[\]\|\\/\ ? \ < \ > \, \.\: \;] {
		2,
		16
	}
	$ / ig) == null) {
		document.mainform.username.focus();
		alert(loing_input_err);
		return false
	}
	if (document.mainform.password.value == "" || document.mainform.password.value < 5) {
		document.mainform.password.focus();
		alert(loing_input_err);
		return false
	}
	if (seccodetype == '1' && document.mainform.seccode.value.match(/^[A-Z]{4}$/ig) == null) {
		document.mainform.seccode.focus();
		alert(seccode_empty);
		return false
	}
}
function checktypename(dbname, value, loadurl, gettxtid, okmess, nomess, bottonname) {
	var um = document.getElementById(gettxtid);
	if (value == '') {
		um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
		$('#' + bottonname).attr('disabled', 'true');
		return false
	}
	$.ajax({
		type: "POST",
		url: loadurl,
		data: dbname + "=" + value,
		success: function(date) {
			if (date == "false") {
				um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
				$('#' + bottonname).attr('disabled', 'true')
			} else {
				um.innerHTML = "<font color=\"#1CB521\">" + okmess + "</font>";
				$('#' + bottonname).attr('disabled', '')
			}
		}
	})
}
function memberdbreg(seccodetype) {
	if (!document.memberreg.username.value.match(/^[^!@~`\'\"#\$\%\^&\*\(\)\+\-\{\}\[\]\|\\/\ ? \ < \ > \, \.\: \;] {
		2,
		16
	}
	$ / ig)) {
		alert(username_len);
		document.memberreg.username.focus();
		return false
	}
	if (!document.memberreg.email.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ig)) {
		alert(email_err);
		document.memberreg.email.focus();
		return false
	}
	if (document.memberreg.password.value.length < 6 || document.memberreg.password.value.length > 15) {
		alert(password_len);
		document.memberreg.password.focus();
		return false
	}
	if (document.memberreg.password.value == "123456" || document.memberreg.password.value == "111111" || document.memberreg.password.value == "aaaaaa" || document.memberreg.password.value == "654321" || document.memberreg.password.value == "abcdef") {
		alert(password_len2);
		document.memberreg.password.focus();
		return false
	}
	if (document.memberreg.username.value == document.memberreg.password.value) {
		alert(password_len2);
		document.memberreg.password.focus();
		return false
	}
	if (document.memberreg.password2.value == "") {
		alert(password2_empty);
		document.memberreg.password2.focus();
		return false
	}
	if (document.memberreg.password2.value != document.memberreg.password.value) {
		alert(password_disaffinity);
		document.memberreg.password.focus();
		return false
	}
	if (seccodetype == '1' && document.memberreg.seccode.value.match(/^[A-Z]{4}$/ig) == null) {
		alert(seccode_empty);
		document.memberreg.seccode.focus();
		return false
	}
	if (!document.getElementById("agree").checked) {
		alert(agree_empty);
		return false
	}
}
function editpassword() {
	if (document.editmember.oldpassword.value == "" || document.editmember.oldpassword.value.length < 6) {
		alert(oldpassword_err);
		document.editmember.oldpassword.focus();
		return false
	}
	if (document.editmember.password.value.length < 6 || document.editmember.password.value.length > 15) {
		alert(password_len);
		document.editmember.password.focus();
		return false
	}
	if (document.editmember.password.value == "123456" || document.editmember.password.value == "111111" || document.editmember.password.value == "aaaaaa" || document.editmember.password.value == "654321" || document.editmember.password.value == "abcdef") {
		alert(password_len2);
		document.editmember.password.focus();
		return false
	}
	if (document.editmember.password2.value == "") {
		alert(password2_empty);
		document.editmember.password2.focus();
		return false
	}
	if (document.editmember.password2.value != document.editmember.password.value) {
		alert(password_disaffinity);
		document.editmember.password.focus();
		return false
	}
}
function editmail() {
	if (document.editmember.password.value == "" || document.editmember.password.value.length < 6) {
		alert(password_len);
		document.editmember.password.focus();
		return false
	}
	if (!document.editmember.email.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/ig)) {
		alert(email_err);
		document.editmember.email.focus();
		return false
	}
}
function moblievalidate(istype) {
	if (istype == 1) {
		if (!document.editmoblie.mobile.value.match(/^1[0-9]{10}$/ig)) {
			alert(moblie_validate);
			document.editmoblie.mobile.focus();
			return false
		}
	}
	if (istype == 2) {
		if (!document.editmoblie.mobliesn.value.match(/^[0-9]{8}$/ig)) {
			alert(seccode_empty);
			document.editmoblie.mobliesn.focus();
			return false
		}
		if (document.editmoblie.password.value == "" || document.editmoblie.password.value.length < 6) {
			alert(password_err);
			document.editmoblie.password.focus();
			return false
		}
	}
}
function lostpassword(seccodetype) {
	var istype = $('input[name="istype"]:checked').val();
	if (document.lostpassworddb.username.value.match(/^[^\!@~`\'\"#\$\%\^&\*\(\)\+\-\{\}\[\]\|\\/\ ? \ < \ > \, \.\: \;] {
		2,
		16
	}
	$ / ig) == null) {
		document.lostpassworddb.username.focus();
		alert(username_empty);
		return false
	}
	if (istype == '1') {
		if (!document.lostpassworddb.email.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
			alert(email_match);
			document.lostpassworddb.email.focus();
			return false
		}
	} else {
		if (!document.lostpassworddb.mobile.value.match(/^1[0-9]{10}$/)) {
			alert(moblie_validate);
			document.lostpassworddb.mobile.focus();
			return false
		}
	}
	if (seccodetype == '1' && document.lostpassworddb.seccode.value.match(/^[A-Z]{4}$/ig) == null) {
		document.lostpassworddb.seccode.focus();
		alert(seccode_empty);
		return false
	}
}
function forumcreat(seccodetype) {
	if (document.bbsmainform.title.value == "") {
		alert(forum_title_err);
		document.bbsmainform.title.focus();
		return false
	}
	if (document.bbsmainform.username.value == "") {
		alert(forum_input_err);
		document.bbsmainform.username.focus();
		return false
	}
	if (document.bbsmainform.content.value == "") {
		alert(forum_input_err);
		document.bbsmainform.content.focus();
		return false
	}
	if (!document.bbsmainform.email.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
		alert(email_err);
		document.bbsmainform.email.focus();
		return false
	}
	if (seccodetype == '1' && document.bbsmainform.seccode.value.match(/^[A-Z]{4}$/ig) == null) {
		document.bbsmainform.seccode.focus();
		alert(seccode_empty);
		return false
	}
}
function orderamount(id) {
	var amout = document.getElementById("amount" + id);
	var amountvalue = document.getElementById("amount" + id).value;
	if (amountvalue.match(/^[1-9]{1}[0-9]*$/ig) == null) {
		alert(order_amout_err);
		amout.value = '1';
		return false
	}
}
function ordersave() {
	if (document.ordersaveform.alias.value == "") {
		document.ordersaveform.alias.focus();
		alert(alias_empty);
		return false
	}
	if (!document.ordersaveform.email.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
		alert(email_err);
		document.ordersaveform.email.focus();
		return false
	}
	if (document.ordersaveform.address.value == "") {
		document.ordersaveform.address.focus();
		alert(address_title);
		return false
	}
	if (document.ordersaveform.tel.value == "" && document.ordersaveform.mobile.value == "") {
		document.ordersaveform.tel.focus();
		alert(tel_empty);
		return false
	}
}
function enquirysave() {
	if (document.mainform.linkman.value == "") {
		document.mainform.linkman.focus();
		alert(alias_empty);
		return false
	}
	if (!document.mainform.email.value.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
		alert(email_err);
		document.mainform.email.focus();
		return false
	}
	if (document.mainform.address.value == "") {
		document.mainform.address.focus();
		alert(address_title);
		return false
	}
	if (document.mainform.tel.value == "" && document.mainform.mobile.value == "") {
		document.mainform.tel.focus();
		alert(tel_empty);
		return false
	}
}
function ondisplayother(div, style, div2, style2) {
	$('#' + div).removeClass().addClass(style);
	$('#' + div2).removeClass().addClass(style2)
}