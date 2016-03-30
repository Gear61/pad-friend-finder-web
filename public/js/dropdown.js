function formatMonster (monster) {
    if (!monster.id) { return monster.text; }
    var imgUrl = "http://puzzledragonx.com/en/img/book/" + monster.monster_id + ".png";
    var $state = $(
        '<span><img src=' + imgUrl + ' class="monster-suggestion-picture"/> ' + monster.text + '</span>'
    );
    return $state;
};

function monsterMatch (input, matchCandidate) {
    if (input == null || input.length == 0) {
        return matchCandidate == 'God of the Night, Tsukuyomi Dragon' ||
            matchCandidate == 'Sun God, Ra Dragon' ||
            matchCandidate == 'Awoken Sakuya' ||
            matchCandidate == 'Awoken Bastet' ||
            matchCandidate == 'Thought Spinner Norn, Verdandi';
    } else {
        return matchCandidate.toLowerCase().indexOf(input.toLowerCase()) != -1;
    }
}

$.fn.select2.amd.require(['select2/compat/matcher'], function (oldMatcher) {
    $("#monster-suggestion-dropdown").select2({
        placeholder: "I am looking for...",
        data: formattedMonsters,
        templateResult: formatMonster,
        matcher: oldMatcher(monsterMatch)
    })
});

$("#monster-suggestion-dropdown").on("select2:select", function (e) {
    var monsterName = e.params.data.text;
    var monsterId = e.params.data.monster_id;
    $("#monster-name").text(monsterName);
    $("#monster-picture").attr("src", "http://puzzledragonx.com/en/img/book/" + monsterId + ".png");
});