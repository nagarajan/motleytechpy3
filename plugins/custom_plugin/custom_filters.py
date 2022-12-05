
import logging
from pelican import signals

logger = logging.getLogger(__name__)

def in_category(value, category, start=0, end=None):
    try:
        return list(filter(lambda x: category == str(x.category), value))[start: end]
    except ValueError as e:
        logger.error(
            "%s ValueError. value: %s, type(value): %s, category: %s",
            'custom_filter: ',
            value,
            type(value),
            category,
        )
        raise e

def not_in_category(value, category, start=0, end=None):
    try:
        return list(filter(lambda x: not(category != str(x.category)), value))[start: end]
    except ValueError as e:
        logger.error(
            "%s ValueError. value: %s, type(value): %s, category: %s",
            'custom_filter: ',
            value,
            type(value),
            category,
        )
        raise e

def without_tag(value, tag, start, end):
    try:
        return list(filter(lambda x: not(tag in x.tags), value))[start: end]
    except ValueError as e:
        logger.error(
            "%s ValueError. value: %s, type(value): %s, tag: %s",
            'custom_filter: ',
            value,
            type(value),
            tag,
        )
        raise e

def with_tag(value, tag, start, end):
    try:
        return list(filter(lambda x: tag in x.tags, value))[start: end]
    except ValueError as e:
        logger.error(
            "%s ValueError. value: %s, type(value): %s, tag: %s",
            'custom_filter: ',
            value,
            type(value),
            tag,
        )
        raise e

def add_custom_filters(pelican):
    """Add (register) all filters to Pelican."""
    pelican.env.filters.update({"with_tag": with_tag})
    pelican.env.filters.update({"without_tag": without_tag})
    pelican.env.filters.update({"in_category": in_category})
    pelican.env.filters.update({"not_in_category": not_in_category})

def register():
    """Plugin registration."""
    signals.generator_init.connect(add_custom_filters)
