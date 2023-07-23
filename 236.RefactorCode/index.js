/**  
 * Создает пары вида ["вид спорта", "имя участника"],  
 * где первому виду спорта соответствует последний участник  
 */
function assignParticipants(participants, sports) {

    if (!participants.length || !sports.length) {
        return [];
    }

    const pairs = new Array(participants.length).fill([]);

    for (let i = 0; i < participants.length; i++) {
        pairs[i] = [sports[i], participants[participants.length - i - 1]];
    }

    console.log({pairs})
    return pairs;
}

assignParticipants(["Mary", "Kate"],["football", "hockey"])

module.exports = assignParticipants