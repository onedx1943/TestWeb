from django import template
from django.template.defaultfilters import stringfilter
import time

register = template.Library()


@register.filter
@stringfilter
def time_stamp(value):
    timestamp = int(round(time.time() * 1000))
    return '%s?%s' % (value, timestamp)
