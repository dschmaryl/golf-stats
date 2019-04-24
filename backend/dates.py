from datetime import datetime


DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def date_to_str(date):
    if isinstance(date, datetime):
        return date.strftime(DATE_FORMAT)
    return date


def str_to_date(date):
    if isinstance(date, str):
        return datetime.strptime(date, DATE_FORMAT)
    return date
