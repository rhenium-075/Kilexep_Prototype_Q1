import time
import logging
from celery import shared_task
from django.contrib.auth import get_user_model

User = get_user_model()
log = logging.getLogger(__name__)

@shared_task(bind=True)
def run_blog_automation(self, user_id: str, naver_id: str, naver_pw: str):
    """
    Celery task for blog automation - credentials are passed directly and never stored
    """
    job_id = self.request.id
    
    try:
        # Log job start without credentials
        log.info(f'Background job {job_id} started for user {user_id}')
        
        # Update task status
        self.update_state(
            state='PROGRESS',
            meta={'progress': 0, 'message': '작업 시작...', 'current': 0, 'total': 2}
        )
        
        # SECURITY: Use credentials immediately, never store them
        # In a real implementation, use credentials for API calls here
        # For demo purposes, we just simulate work
        
        time.sleep(2)
        results = []
        
        for i in range(1, 3):
            progress = int((i - 1) / 2 * 100)
            
            # Update task progress
            self.update_state(
                state='PROGRESS',
                meta={
                    'progress': progress,
                    'message': f'{i}/2 번째 글 작성 중...',
                    'current': i - 1,
                    'total': 2
                }
            )
            
            time.sleep(3)
            
            # Simulate using credentials for API call (without logging them)
            # actual_api_call(naver_id, naver_pw)  # This would be the real implementation
            
            results.append({'index': i, 'title': f'작업 {i}', 'status': 'success'})
        
        log.info(f'Background job {job_id} completed successfully')
        
        return {
            'progress': 100,
            'message': '작업 완료!',
            'results': results,
            'current': 2,
            'total': 2
        }
        
    except Exception as exc:
        # Log error without sensitive information
        log.error(f'Background job {job_id} failed', extra={
            'job_id': job_id,
            'user_id': user_id,
            'error': str(exc)
        })
        
        self.update_state(
            state='FAILURE',
            meta={
                'progress': 0,
                'message': f'오류 발생: {str(exc)}',
                'error': str(exc)
            }
        )
        raise exc
    
    finally:
        # SECURITY: Clear credentials from memory
        del naver_id, naver_pw

@shared_task
def cleanup_old_tasks():
    """
    Periodic task to clean up old task results
    """
    from django_celery_results.models import TaskResult
    from django.utils import timezone
    from datetime import timedelta
    
    # Delete task results older than 7 days
    cutoff = timezone.now() - timedelta(days=7)
    deleted_count = TaskResult.objects.filter(date_done__lt=cutoff).delete()[0]
    
    log.info(f'Cleaned up {deleted_count} old task results')
    return f'Cleaned up {deleted_count} old task results'

@shared_task
def health_check():
    """
    Simple health check task
    """
    return 'Celery is working!'
