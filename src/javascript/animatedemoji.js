function openfolder() {
    var a;
    a = document.getElementById("div1");
    a.innerHTML = "&#xf114;";
    setTimeout(function () {
      a.innerHTML = "&#xf115;";
    }, 2000);
  }
  openfolder();
  setInterval(openfolder, 2000);

  function openfolder_1() {
    var b;
    b = document.getElementById("div2");
    b.innerHTML = "&#xf114;";
    setTimeout(function () {
      b.innerHTML = "&#xf115;";
    }, 2000);
  }
  openfolder_1();
  setInterval(openfolder_1, 2000);

  function openfolder_2() {
    var c;
    c = document.getElementById("div3");
    c.innerHTML = "&#xf114;";
    setTimeout(function () {
      c.innerHTML = "&#xf115;";
    }, 2000);
  }
  openfolder_2();
  setInterval(openfolder_2, 2000);

  function openfolder_3() {
    var d;
    d = document.getElementById("div4");
    d.innerHTML = "&#xf114;";
    setTimeout(function () {
      d.innerHTML = "&#xf115;";
    }, 2000);
  }
  openfolder_3();
  setInterval(openfolder_3, 2000);