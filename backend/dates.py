from datetime import datetime


DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def date_to_str(date):
    if type(date) != str:
        return date.strftime(DATE_FORMAT)
    else:
        return date


def str_to_date(date):
    if type(date) == str:
        return datetime.strptime(date, DATE_FORMAT)
    else:
        return date
