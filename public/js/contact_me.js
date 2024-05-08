$(function () {
    $("#contactForm input,#contactForm textarea").jqValidation({
        preventSubmit: !0, submitError: function (t, e, s) {
        }, submitSuccess: function (t, e) {
            e.preventDefault();
            var s = $("input#name").val(), a = $("input#email").val(),
                n = $("input#phone").val(), c = $("textarea#message").val(), i = s;
            i.indexOf(" ") >= 0 && (i = s.split(" ").slice(0, -1).join(" ")), $this = $("#sendMessageButton"), $this.prop("disabled", !0), $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {name: s, phone: n, email: a, message: c},
                cache: !1,
                success: function () {
                    $("#success").html("<div class='alert alert-success'>"), $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"), $("#success > .alert-success").append("<strong>Your message has been sent. </strong>"), $("#success > .alert-success").append("</div>"), $("#contactForm").trigger("reset")
                },
                error: function () {
                    $("#success").html("<div class='alert alert-danger'>"), $("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>"), $("#success > .alert-danger").append($("<strong>").text("Sorry " + i + ", it seems that my mail server is not responding. Please try again later!")), $("#success > .alert-danger").append("</div>"), $("#contactForm").trigger("reset")
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", !1)
                    }, 1e3)
                }
            })
        }, filter: function () {
            return $(this).is(":visible")
        }
    }), $('a[data-toggle="tab"]').click(function (t) {
        t.preventDefault(), $(this).tab("show")
    })
}), $("#name").focus(function () {
    $("#success").html("")
});