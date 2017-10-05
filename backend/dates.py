from datetime import datetime


DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def date_to_str(date):
    return date.strftime(DATE_FORMAT)


def str_to_date(date):
    return datetime.strptime(date, DATE_FORMAT)
