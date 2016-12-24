from app import db


def calc_gir(score):
    if (score - putts) <= (par - 2):
        return 1
    else:
        return 0


def adjust_score(round_):
    if round_ == round_.user.rounds.first():
        return round_.total_score
    old_handicap = round_.user.get_handicap(round_.id - 1)
    course_handicap = round(old_handicap * round_.tee.slope / 113, 1)
    if course_handicap < 10:
        # max is double bogey. this needs to be fixed
        max_score = 7
    elif course_handicap < 20:
        max_score = 7
    elif course_handicap < 30:
        max_score = 8
    elif course_handicap < 40:
        max_score = 9
    else:
        max_score = 10

    adjusted_score = 0
    for score in round_.scores:
        adjusted_score += min(max_score, score.score)
    return adjusted_score


def calc_diff(round_):
    return (adjust_score(round_) - round_.tee.rating) * 113 / round_.tee.slope


def calc_handicap(round_):
    rounds = round_.user.rounds.all()
    round_idx = rounds.index(round_)
    rounds = rounds[max(0, round_idx - 19):round_idx+1]

    if len(rounds) < 5:
        # not enough rounds yet
        return 50.0

    diffs_used_table = {
        5: 1, 6: 1, 7: 2, 8: 2, 9: 3, 10: 3, 11: 4, 12: 4,
        13: 5, 14: 5, 15: 6, 16: 6, 17: 7, 18: 8, 19: 9, 20: 10
    }
    num_of_diffs_used = diffs_used_table[len(rounds)]
    diffs = sorted([calc_diff(r) for r in rounds])[:num_of_diffs_used]
    handicap = sum(diffs) / len(diffs) * .96

    char_list = list(str(handicap))
    handicap = float(''.join(char_list[:char_list.index('.') + 2]))

    return handicap
