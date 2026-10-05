// Modern Hotspot JavaScript Helper for MikroTik
(function() {
  // Convert Bytes to Arabic Human-Readable
  window.toArabicBytes = function(bytes) {
    if (!bytes || bytes === "" || isNaN(bytes)) return bytes || "0 بايت";
    var b = parseInt(bytes, 10);
    if (b === 0) return "0 بايت";
    var k = 1024;
    var sizes = ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت", "تيرابايت"];
    var i = Math.floor(Math.log(b) / Math.log(k));
    if (i >= sizes.length) i = sizes.length - 1;
    var val = (b / Math.pow(k, i)).toFixed(2);
    return val + " " + sizes[i];
  };

  // Convert Time/Uptime to Arabic Human-Readable
  window.toArabicTime = function(timeStr) {
    if (!timeStr || timeStr === "") return "0 ثانية";
    var s = timeStr.toString();
    s = s.replace(/w/gi, " أسبوع ");
    s = s.replace(/d/gi, " يوم ");
    s = s.replace(/h/gi, " ساعة ");
    s = s.replace(/m/gi, " دقيقة ");
    s = s.replace(/s/gi, " ثانية ");
    return s.trim();
  };

  // Convert MikroTik Error to User-Friendly Arabic
  window.toArabicError = function(error) {
    if (!error || error === "") return "";
    var e = error.toString().toLowerCase();
    if (e.indexOf("simultaneous session limit reached") !== -1 || e.indexOf("no more sessions") !== -1) {
      return "لا يمكن تسجيل الدخول أكثر من مرة، الحساب مستخدم حالياً";
    }
    if (e.indexOf("invalid username or password") !== -1) {
      return "خطأ في رمز الدخول، تأكد من كتابته بشكل صحيح وحاول مجدداً";
    }
    if (e.indexOf("invalid password") !== -1) {
      return "تأكد من كتابة كلمة المرور بشكل صحيح";
    }
    if (e.indexOf("access denied at this time") !== -1) {
      return "بطاقة سهرة لا يمكن استخدامها في هذا الوقت";
    }
    if (e.indexOf("uptime limit reached") !== -1) {
      return "عذراً لقد انتهى الوقت المتاح لهذه البطاقة";
    }
    if (e.indexOf("no valid profile found") !== -1) {
      return "لقد انتهت صلاحية هذه البطاقة";
    }
    if (e.indexOf("transfer limit reached") !== -1 || e.indexOf("traffic limit") !== -1) {
      return "انتهى رصيد البيانات المتاح لهذه البطاقة";
    }
    if (e.indexOf("invalid calling-station-id") !== -1 || e.indexOf("mac address") !== -1) {
      return "هذا الحساب مقترن بجهاز آخر";
    }
    if (e.indexOf("not found") !== -1) {
      return "رمز الدخول غير موجود، يرجى التأكد من الرقم";
    }
    if (e.indexOf("radius timeout") !== -1) {
      return "عزيزي المشترك نعتذر عن انقطاع الخدمة المؤقت بسبب الصيانة";
    }
    return error;
  };

  // Banner Slider Engine
  document.addEventListener("DOMContentLoaded", function() {
    var slides = document.querySelectorAll(".banner-slide");
    var dots = document.querySelectorAll(".banner-dot");
    if (slides.length > 1) {
      var currentSlide = 0;
      function showSlide(index) {
        slides.forEach(function(s) { s.classList.remove("active"); });
        dots.forEach(function(d) { d.classList.remove("active"); });
        slides[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
      }
      setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 4000);
      dots.forEach(function(dot, idx) {
        dot.addEventListener("click", function() {
          currentSlide = idx;
          showSlide(currentSlide);
        });
      });
    }

    // Auto close error modal when clicked outside
    var alertModal = document.getElementById("alert-error");
    if (alertModal) {
      alertModal.addEventListener("click", function(e) {
        if (e.target === alertModal || e.target.classList.contains("alert-modal-btn")) {
          alertModal.style.display = "none";
        }
      });
    }
  });
})();
