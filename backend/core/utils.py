from functools import wraps
from django.http import JsonResponse
import logging
import uuid

log = logging.getLogger("auth")

def api_view(fn):
    @wraps(fn)
    def _w(request, *a, **k):
        rid = request.headers.get("X-Request-Id", str(uuid.uuid4()))
        try:
            return fn(request, *a, **k)
        except (ValueError, KeyError) as e:
            log.info({"ev":"bad_request","rid":rid,"msg":str(e)})
            return JsonResponse({"ok":False,"code":"bad_request","message":str(e)},status=400)
        except PermissionError as e:
            log.info({"ev":"unauthorized","rid":rid,"msg":str(e)})
            return JsonResponse({"ok":False,"code":"unauthorized","message":str(e)},status=401)
        except Exception as e:
            log.exception("server_error %s", rid)
            return JsonResponse({"ok":False,"code":"server_error","message":"internal"},status=500)
    return _w