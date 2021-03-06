Template.bigquestion.onCreated(function(){
  this.questions = new ReactiveVar(1);
});

Template.bigquestion.helpers({
  factors() {
    var w = Math.round(Session.get("strength-h"));
    var s = Math.round(Session.get("strength-s"));
    var t = Math.round(Session.get("strength-t"));
    var a = Math.round(Session.get("strength-p"));

    if (w == 0) w = "0"; if (s == 0) s = "0";
    if (t == 0) t = "0"; if (a == 0) a = "0";

    if(!$(".health"  ).attr("checked")) w = false
    if(!$(".safety"  ).attr("checked")) s = false
    if(!$(".traffic" ).attr("checked")) t = false
    if(!$(".polluted").attr("checked")) a = false

    return { w: w, s: s, t: t, a: a };
  },
  legend() {
    return Session.get("qnumber") + 1;
  },
  question() {
    var option = Session.get("option");
    var current = Number(Session.get("qnumber")) + 1 ;
    $(".question-container").fadeOut(function(){
      $(".question-"+Number(Session.get("qnumber"))).fadeIn();
    });
    return {option: option,number: number};
  },
  slider() {
    var val = 100;
    var q = Number(Session.get("qnumber"));
    if(q > 4  && q < 6  ) val = Number(Session.get("gold1"));
    if(q > 6  && q < 8  ) val = Number(Session.get("gold2"));
    if(q > 8  && q < 10 ) val = Number(Session.get("gold3"));
    if(q > 10 && q < 12 ) val = Number(Session.get("gold4"));
    return {a: Math.round(val), x: val-2};
  }
});

Template.bigquestion.events({
  "click .question-answers" (event,instance) {
    $(".question-buttons").css("visibility","visible");
  },
  "click .big-golden"(event, instance) {
    var current = Number(Session.get("qnumber"));
    var question = Session.get("order")[current];
    // Reset the sidebar...
    Session.set("strength-t",100);
    Session.set("strength-p",100);
    Session.set("strength-s",100);
    Session.set("strength-h",100);
    // Clear the sidebar
    $(".content-left").empty();
    Blaze.render(Template.navfilter,$(".content-left")[0]);
    $(".question-answers").css("visibility","hidden");
    $(".question-buttons").css("visibility","hidden");

    $(".golden").fadeOut(function(){
      setTimeout(function() {
        Session.set("qnumber",current+1);
        $(".question-"+(Session.get("order")[current+1])).fadeIn();
        $(".start-question-container").fadeIn( function() {
          $(".start-question").fadeIn();
        });
      }, 700);
    });

  },
  "click .big-next"  (event, instance) {
    if(Number(Session.get("qnumber")) >= 11) {
      var current  = Number(Session.get("qnumber"));
      var question = Session.get("order")[current];
      var timeend = Date.now();
      var weather = Math.round(Session.get("strength-h"));
      var safety  = Math.round(Session.get("strength-s"));
      var traffic = Math.round(Session.get("strength-t"));
      var air     = Math.round(Session.get("strength-p"));
      var gold1 = Session.get("gold1");
      var gold2 = Session.get("gold2");
      var gold3 = Session.get("gold3");
      var gold4 = Session.get("gold4");
      var trust = 5;
      if(Number(gold1) != 60  && current > 2) trust = trust - 1;
      if(Number(gold2) != 35  && current > 3) trust = trust - 1;
      if(Number(gold3) != 25  && current > 5) trust = trust - 1;
      if(Number(gold4) != 75  && current > 7) trust = trust - 1;
      var actions_sw = Session.get("actions_sw",0);
      var actions_ss = Session.get("actions_ss",0);
      var actions_st = Session.get("actions_st",0);
      var actions_sa = Session.get("actions_sa",0);
      var actions_cw = Session.get("actions_cw",0);
      var actions_cs = Session.get("actions_cs",0);
      var actions_ct = Session.get("actions_ct",0);
      var actions_ca = Session.get("actions_ca",0);
      var actions = actions_sw + actions_ss + actions_st + actions_sa + actions_cw + actions_cs + actions_ct + actions_ca;
      var correct = false;

      if(weather == 0) weather = "0"; if(safety == 0) safety = "0";
      if(traffic == 0) traffic = "0"; if(air    == 0) air    = "0";

      if(!$(".health"  ).attr("checked")) weather = false;
      if(!$(".safety"  ).attr("checked")) safety  = false;
      if(!$(".traffic" ).attr("checked")) traffic = false;
      if(!$(".polluted").attr("checked")) air     = false;

      if(question==1) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "atlanta")  correct = true;
      }

      if(question==2) {
        ans_a = $("input[name=factors]:checked").val();
        ans_b = "";
        if(ans_a == "air")  correct = true;
      }

      if(question==3) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "denver")  correct = true;
      }

      if(question==4) {
        ans_a = $(".control-a-4 option:selected").text();
        ans_b = $(".control-b-4 option:selected").text();
        if(ans_a == "Traffic" && ans_b == "Safety")  correct = true;
        if(ans_a == "Safety"  && ans_b == "Traffic") correct = true;
      }

      if(question==5) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "houston")  correct = true;
      }

      if(question==6) {
        ans_a = "";
        ans_b = "";
        if(weather== "0" && !safety && traffic=="0" && air == 100)  correct = true;
      }

      if(question==7) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "seattle")  correct = true;
      }

      if(question==8) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "angeles")  correct = true
      }

      if(question==9) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "atlanta")  correct = true
      }

      if(question==10) {
        var ans_a = $("input[name=cities]:checked").val();
        var ans_b = "";
        if(ans_a == "atlanta")  correct = true;
      }

      if(question==11) {
        ans_a = $(".control-a-11 option:selected").text();
        ans_b = "";
        var a1 = false;
        var a2 = false;
        var a3 = false;
        var ax = 0;
        $("input[name=cities]:checked").each(function() {
          ans_b = ans_b + $(this).attr('value') + "-";
          if($(this).attr('value') == "denver")  a1 = true;
          if($(this).attr('value') == "atlanta") a2 = true;
          if($(this).attr('value') == "seattle") a3 = true;
        });

        ax = a1 * a2 * a3;
        if(ans_a == "Traffic" && ax == 1)  correct = true;
      }

      if(question==12) {
        var ans_a = $("input[name=cities]:checked").val();
        var ans_b = "";
        if(ans_a == "newyork")  correct = true;
      }

      $("input:radio").removeAttr("checked");
      $("input:checkbox").removeAttr("checked");

      console.log({
      //Answers.insert({
        userid:    Session.get("ssid"),
        timestart: Session.get("qstart"),
        timeend:   timeend,
        timespent: timeend - Session.get("qstart"),
        actions_sw: actions_sw,
        actions_ss: actions_ss,
        actions_st: actions_st,
        actions_sa: actions_sa,
        actions_cw: actions_cw,
        actions_cs: actions_cs,
        actions_ct: actions_ct,
        actions_ca: actions_ca,
        golden1: gold1,
        golden2: gold2,
        golden3: gold3,
        golden4: gold4,
        trust:   trust,
        actions:  actions,
        question: question,
        correct: correct,
        ans_a: ans_a,
        ans_b: ans_b,
        viz:      Session.get("option"),
        weather:  weather,
        safety:   safety,
        traffic:  traffic,
        air:      air
      });
      $(".big-thanks").fadeIn();

    } else {

      var current  = Number(Session.get("qnumber"));
      var question = Session.get("order")[current];
      var timeend = Date.now();
      var weather = Math.round(Session.get("strength-h"));
      var safety  = Math.round(Session.get("strength-s"));
      var traffic = Math.round(Session.get("strength-t"));
      var air     = Math.round(Session.get("strength-p"));
      var gold1 = Session.get("gold1");
      var gold2 = Session.get("gold2");
      var gold3 = Session.get("gold3");
      var gold4 = Session.get("gold4");
      var trust = 5;
      if(Number(gold1) != 60  && question > 2) trust = trust - 1;
      if(Number(gold2) != 35  && question > 3) trust = trust - 1;
      if(Number(gold3) != 25  && question > 5) trust = trust - 1;
      if(Number(gold4) != 75  && question > 7) trust = trust - 1;
      var actions_sw = Session.get("actions_sw",0);
      var actions_ss = Session.get("actions_ss",0);
      var actions_st = Session.get("actions_st",0);
      var actions_sa = Session.get("actions_sa",0);
      var actions_cw = Session.get("actions_cw",0);
      var actions_cs = Session.get("actions_cs",0);
      var actions_ct = Session.get("actions_ct",0);
      var actions_ca = Session.get("actions_ca",0);
      var actions = actions_sw + actions_ss + actions_st + actions_sa + actions_cw + actions_cs + actions_ct + actions_ca;
      var correct = false;
      var ans_a = "";
      var ans_b = "";

      if(weather == 0) weather = "0"; if(safety == 0) safety = "0";
      if(traffic == 0) traffic = "0"; if(air    == 0) air    = "0";

      if(!$(".health"  ).attr("checked")) weather = false;
      if(!$(".safety"  ).attr("checked")) safety  = false;
      if(!$(".traffic" ).attr("checked")) traffic = false;
      if(!$(".polluted").attr("checked")) air     = false;

      if(question==1) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "atlanta")  correct = true;
      }

      if(question==2) {
        ans_a = $("input[name=factors]:checked").val();
        ans_b = "";
        if(ans_a == "air")  correct = true;
      }

      if(question==3) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "denver")  correct = true;
      }

      if(question==4) {
        ans_a = $(".control-a-4 option:selected").text();
        ans_b = $(".control-b-4 option:selected").text();
        if(ans_a == "Traffic" && ans_b == "Safety")  correct = true;
        if(ans_a == "Safety"  && ans_b == "Traffic") correct = true;
      }

      if(question==5) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "newyork")  correct = true;
      }

      if(question==6) {
        ans_a = "";
        ans_b = "";
        if(weather== "0" && !safety && traffic=="0" && air == 100)  correct = true;
      }

      if(question==7) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "seattle")  correct = true;
      }

      if(question==8) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "angeles")  correct = true
      }

      if(question==9) {
        ans_a = $("input[name=cities]:checked").val();
        ans_b = "";
        if(ans_a == "atlanta")  correct = true
      }

      if(question==10) {
        var ans_a = $("input[name=cities]:checked").val();
        var ans_b = "";
        if(ans_a == "atlanta")  correct = true;
      }

      if(question==11) {
        ans_a = $(".control-a-11 option:selected").text();
        ans_b = "";
        var a1 = false;
        var a2 = false;
        var a3 = false;
        var ax = 0;
        $("input[name=cities]:checked").each(function() {
          ans_b = ans_b + $(this).attr('value') + "-";
          if($(this).attr('value') == "denver")  a1 = true;
          if($(this).attr('value') == "atlanta") a2 = true;
          if($(this).attr('value') == "seattle") a3 = true;
        });

        ax = a1 * a2 * a3;
        if(ans_a == "Traffic" && ax == 1)  correct = true;
      }

      if(question==12) {
        var ans_a = $("input[name=cities]:checked").val();
        var ans_b = "";
        if(ans_a == "newyork")  correct = true;
      }

      $("input:radio").removeAttr("checked");
      $("input:checkbox").removeAttr("checked");

      console.log({
      //Answers.insert({
        userid:    Session.get("ssid"),
        timestart: Session.get("qstart"),
        timeend:   timeend,
        timespent: timeend - Session.get("qstart"),
        actions_sw: actions_sw,
        actions_ss: actions_ss,
        actions_st: actions_st,
        actions_sa: actions_sa,
        actions_cw: actions_cw,
        actions_cs: actions_cs,
        actions_ct: actions_ct,
        actions_ca: actions_ca,
        golden1: gold1,
        golden2: gold2,
        golden3: gold3,
        golden4: gold4,
        trust:   trust,
        actions:  actions,
        question: question,
        correct: correct,
        ans_a: ans_a,
        ans_b: ans_b,
        viz:      Session.get("option"),
        weather:  weather,
        safety:   safety,
        traffic:  traffic,
        air:      air
      });

      Session.set("actions_sw",0);
      Session.set("actions_ss",0);
      Session.set("actions_st",0);
      Session.set("actions_sa",0);
      Session.set("actions_cw",0);
      Session.set("actions_cs",0);
      Session.set("actions_ct",0);
      Session.set("actions_ca",0);

      // Reset the sidebar...
      Session.set("strength-t",100);
      Session.set("strength-p",100);
      Session.set("strength-s",100);
      Session.set("strength-h",100);
      // Clear the sidebar
      $(".content-left").empty();
      Blaze.render(Template.navfilter,$(".content-left")[0]);
      // Hide answers from questionnare
      // Go to next question..
      $(".question-"+question).fadeOut(function(){
        if(current == 5) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-5-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else if(current == 7) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-7-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else if(current == 9) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-9-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else if(current == 11) {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          $(".question-11-1").fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        } else {
          $(".question-answers").css("visibility","hidden");
          $(".question-buttons").css("visibility","hidden");
          Session.set("qnumber",current+1);
          $(".question-"+(Session.get("order")[current+1])).fadeIn();
          $(".start-question-container").fadeIn( function() {
            $(".start-question").fadeIn();
          });
        }
      });
    }
  },
  "click .start-question" (event,instance) {
    Session.set("qstart",Date.now());
    $(".start-question").fadeOut();
    $(".start-question-container").fadeOut( function() {
      $(".navfilter-container").css("visibility","visible");
    });
  },
  "click .big-finish" (event, instance) {
  },
  "click .fd-next" (event, instance) {
    var a = $("input[name=difficulty]:checked").val();
    $(".feedback-difficulty").fadeOut(function(){
      Session.set("feedback-difficulty",a);
      $(".feedback-preference").fadeIn();
    });
  }
});


Template.bigquestion.rendered = function () {
  var self = this;
  this.$("#question-slider1").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    tooltips: true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold1",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

  this.$("#question-slider2").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    tooltips: true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold2",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

  this.$("#question-slider3").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    tooltips: true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold3",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

  this.$("#question-slider4").noUiSlider({
    start: 100,
    step: 1,
    connect: "lower",
    tooltips: true,
    range: {'min': 0, 'max': 100}
  }).on('slide', function (ev, val) {
    Session.set("gold4",Number(val));
  }).on('set', function(){
    self.$(".question-buttons").css("visibility","visible");
  });

};
