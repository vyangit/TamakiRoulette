var app = angular.module('app')
    .controller('HomeController', function($scope) {
        var numChoices = 6;

        $scope.saveRoulette = function() {
            $('#saveRouletteModal').modal('show');
        };

        $('#saveRouletteModal').on('hidden.bs.modal', function() {
            $(this).find('form')[0].reset();
        });

        $scope.saveModalSubmit = function() {
            var saveName = $('#saveRouletteModal').find('input#name').val().trim();
            var choices = getChoices();
        }

        function getChoices() {
            var inputs = $('#home').find('form#choices').find('input[type="text"]');
            var choices = [];
            for (var i = 0; i<inputs.length; i++) {
                var value = $(inputs[i]).val().trim();
                if(value.length > 0) {
                    choices.push(value);
                }
            }
            return choices;
        }

        $scope.addMoreChoices = function() {
            $('.shift-right').removeClass('shift-right');
            var html = '<div class=\"row shift-right\">';
            html += addInputChoice() + addInputChoice() + '</div>';
            $('#choices-rows').append(html);

            var choiceId = "#choice" + numChoices;
            $("#addMoreChoices").insertAfter(choiceId);
        }

        function addInputChoice() {
            numChoices++;
            var html = '<input type=\"text\" class=\"form-control\" name=\"choice' + numChoices +'\" id=\"choice' + numChoices + '\" placeholder=\"Choice ' + numChoices + '\"/>';
            return html;
        }

        $scope.viewMoreSavedRoulettes = function() {
            $('#savedRoulettesModal').modal('show');
        };

        $scope.randomize = function() {
            var choices = getChoices();
            if (choices.length < 1) {
                $scope.randomResult = "No inputs! Please make some choices!";
            }
            else {
                $scope.randomResult = choices[Math.floor(Math.random() * choices.length)];
            }
        }
    });